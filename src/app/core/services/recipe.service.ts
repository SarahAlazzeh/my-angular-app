import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  deleteDoc, 
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';

export interface PendingRecipe {
  id?: string;
  name: string;
  type: string;
  ingredients: string;
  prepare: string;
  photo?: string;
  email?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Timestamp | Date;
  submittedBy?: string;
  reviewedBy?: string;
  reviewedAt?: Timestamp | Date;
}

export interface ApprovedRecipe {
  id?: string;
  name: string;
  type: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  category: string;
  submittedBy?: string;
  approvedAt: Timestamp | Date;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private firestore = inject(Firestore);

  // Submit a recipe for review
  async submitRecipe(recipe: Omit<PendingRecipe, 'id' | 'status' | 'submittedAt'>, userId?: string): Promise<string> {
    const recipeData: Omit<PendingRecipe, 'id'> = {
      ...recipe,
      status: 'pending',
      submittedAt: Timestamp.now(),
      submittedBy: userId || undefined
    };

    const pendingRecipesRef = collection(this.firestore, 'pendingRecipes');
    const docRef = await addDoc(pendingRecipesRef, recipeData);
    return docRef.id;
  }


  // Get all pending recipes
  async getPendingRecipes(): Promise<PendingRecipe[]> {
    const pendingRecipesRef = collection(this.firestore, 'pendingRecipes');
    const q = query(
      pendingRecipesRef,
      where('status', '==', 'pending'),
      orderBy('submittedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PendingRecipe));
  }

  // Approve a recipe - add to recipes collection
  async approveRecipe(pendingRecipeId: string, reviewerId: string): Promise<void> {
    const pendingRecipeDoc = doc(this.firestore, 'pendingRecipes', pendingRecipeId);
    
    // Get the pending recipe data
    const docSnapshot = await getDoc(pendingRecipeDoc);
    
    if (!docSnapshot.exists()) {
      throw new Error('Pending recipe not found');
    }

    const pendingData = docSnapshot.data() as PendingRecipe;
    
    // Convert ingredients and instructions from string to array
    const ingredients = pendingData.ingredients
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[-\d]+\.?\s*/, '')); // Remove numbering

    const instructions = pendingData.prepare
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[-\d]+\.?\s*/, '')); // Remove numbering

    // Create approved recipe
    const approvedRecipe: ApprovedRecipe = {
      name: pendingData.name,
      type: pendingData.type,
      category: pendingData.type,
      ingredients,
      instructions,
      image: pendingData.photo || '',
      submittedBy: pendingData.submittedBy || undefined,
      approvedAt: Timestamp.now()
    };

    // Add to recipes collection
    const recipesRef = collection(this.firestore, 'recipes');
    await addDoc(recipesRef, approvedRecipe);

    // Update pending recipe status
    await updateDoc(pendingRecipeDoc, {
      status: 'approved',
      reviewedBy: reviewerId,
      reviewedAt: Timestamp.now()
    });
  }

  // Reject a recipe
  async rejectRecipe(pendingRecipeId: string, reviewerId: string): Promise<void> {
    const pendingRecipeDoc = doc(this.firestore, 'pendingRecipes', pendingRecipeId);
    await updateDoc(pendingRecipeDoc, {
      status: 'rejected',
      reviewedBy: reviewerId,
      reviewedAt: Timestamp.now()
    });
  }

  // Delete a pending recipe (optional - for cleanup)
  async deletePendingRecipe(pendingRecipeId: string): Promise<void> {
    const pendingRecipeDoc = doc(this.firestore, 'pendingRecipes', pendingRecipeId);
    await deleteDoc(pendingRecipeDoc);
  }

  // Get recipe by productId from Firestore
  async getRecipeByProductId(productId: number): Promise<any | null> {
    try {
      const recipesRef = collection(this.firestore, 'recipes');
      const q = query(recipesRef, where('productId', '==', productId));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }
      
      // Return the first matching recipe
      const recipeDoc = snapshot.docs[0];
      const data = recipeDoc.data();
      
      // Convert Firestore recipe to Recipe interface format
      return {
        id: recipeDoc.id,
        productId: data['productId'] || 0,
        title: {
          en: data['name'] || '',
          ar: data['name'] || ''
        },
        description: {
          en: '',
          ar: ''
        },
        image: data['image'] || '',
        ingredients: {
          en: Array.isArray(data['ingredients']) ? data['ingredients'] : [],
          ar: Array.isArray(data['ingredients']) ? data['ingredients'] : []
        },
        instructions: {
          en: Array.isArray(data['instructions']) ? data['instructions'] : [],
          ar: Array.isArray(data['instructions']) ? data['instructions'] : []
        },
        prepTime: data['prepTime'] || 0,
        cookTime: data['cookTime'] || 0,
        servings: data['servings'] || 0,
        difficulty: {
          en: data['difficulty'] || 'Medium',
          ar: data['difficulty'] || 'Medium'
        },
        category: {
          en: data['category'] || data['type'] || '',
          ar: data['category'] || data['type'] || ''
        }
      };
    } catch (error) {
      console.error('Error fetching recipe from Firestore:', error);
      return null;
    }
  }

  // Add a recipe directly (for admin adding products with recipes)
  async addRecipeDirectly(recipe: {
    name: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    image: string;
    productId?: number;
    prepTime?: number;
    cookTime?: number;
    servings?: number;
    difficulty?: string;
  }): Promise<string> {
    const recipeData = {
      name: recipe.name,
      type: recipe.category,
      category: recipe.category,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image,
      productId: recipe.productId || 0,
      prepTime: recipe.prepTime || 0,
      cookTime: recipe.cookTime || 0,
      servings: recipe.servings || 0,
      difficulty: recipe.difficulty || 'Medium',
      approvedAt: Timestamp.now()
    };

    const recipesRef = collection(this.firestore, 'recipes');
    const docRef = await addDoc(recipesRef, recipeData);
    return docRef.id;
  }
}

