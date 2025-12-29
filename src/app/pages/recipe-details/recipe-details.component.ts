import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { recipes } from "../../core/models/recipe.data";
import { Recipe } from "../../core/models/recipe.interface";
import { TranslationService } from "../../core/services/translation.service";
import { RecipeService } from "../../core/services/recipe.service";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-recipedetails',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})

export class RecipedetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  currentLanguage: string = 'en';
  isLoading = true;

  private recipeService = inject(RecipeService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get product ID from route
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      const productIdNum = parseInt(productId);
      
      // First, try to find in static recipes
      this.recipe = recipes.find(r => r.productId === productIdNum);
      
      // If not found in static recipes, try Firestore
      if (!this.recipe) {
        this.isLoading = true;
        const firestoreRecipe = await this.recipeService.getRecipeByProductId(productIdNum);
        if (firestoreRecipe) {
          this.recipe = firestoreRecipe;
        }
      }
    }

    this.isLoading = false;

    // Subscribe to language changes
    this.translationService.getCurrentLanguageObservable().subscribe(lang => {
      this.currentLanguage = lang;
    });
    
    // Get initial language
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  getTitle(): string {
    if (!this.recipe) return '';
    return this.currentLanguage === 'ar' ? this.recipe.title.ar : this.recipe.title.en;
  }

  getDescription(): string {
    if (!this.recipe) return '';
    return this.currentLanguage === 'ar' ? this.recipe.description.ar : this.recipe.description.en;
  }

  getIngredients(): string[] {
    if (!this.recipe) return [];
    return this.currentLanguage === 'ar' ? this.recipe.ingredients.ar : this.recipe.ingredients.en;
  }

  getInstructions(): string[] {
    if (!this.recipe) return [];
    return this.currentLanguage === 'ar' ? this.recipe.instructions.ar : this.recipe.instructions.en;
  }

  getDifficulty(): string {
    if (!this.recipe) return '';
    // Handle both object format (difficulty.en/ar) and string format
    if (typeof this.recipe.difficulty === 'string') {
      return this.recipe.difficulty;
    }
    return this.currentLanguage === 'ar' ? this.recipe.difficulty.ar : this.recipe.difficulty.en;
  }

  getCategory(): string {
    if (!this.recipe) return '';
    return this.currentLanguage === 'ar' ? this.recipe.category.ar : this.recipe.category.en;
  }

  goBack(): void {
    this.router.navigate(['/shop']);
  }
}
