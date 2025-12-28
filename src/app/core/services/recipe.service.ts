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
import { Storage } from '@angular/fire/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  private storage = inject(Storage);

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

  // Upload recipe image
  async uploadRecipeImage(file: File): Promise<string> {
    const filePath = `recipes/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
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
}

