import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { recipes } from "../../core/models/recipe.data";
import { Recipe } from "../../core/models/recipe.interface";
import { TranslationService } from "../../core/services/translation.service";
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    // Get product ID from route
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      // Find recipe by productId
      this.recipe = recipes.find(r => r.productId === parseInt(productId));
    }

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
