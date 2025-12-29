import { Component, inject, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ProductService } from '../../../../core/services/product.service';
import { RecipeService } from '../../../../core/services/recipe.service';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [TranslatePipe, FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  isOpen = signal(false);
  @Output() productAdded = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  private productService = inject(ProductService);
  private recipeService = inject(RecipeService);
  private translationService = inject(TranslationService);

  newImg!: File;
  newTitle = '';
  newPrice = 0;
  newQuantity = '';
  
  // Recipe fields
  includeRecipe = false;
  recipeCategory = '';
  recipeIngredients = '';
  recipeInstructions = '';
  recipePrepTime = 0;
  recipeCookTime = 0;
  recipeServings = 0;
  recipeDifficulty = 'Medium';
  
  imagePreview = signal<string | null>(null);
  isUploading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  open() {
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen.set(false);
    document.body.style.overflow = '';
    this.resetForm();
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  async addProduct() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (!this.newTitle || !this.newPrice || !this.newImg) {
      this.errorMessage.set(this.translationService.translate('shop.addProduct.errors.fillRequired'));
      return;
    }

    // Validate recipe fields if recipe is included
    if (this.includeRecipe) {
      if (!this.recipeCategory || !this.recipeIngredients || !this.recipeInstructions || 
          this.recipePrepTime === null || this.recipePrepTime === undefined ||
          this.recipeCookTime === null || this.recipeCookTime === undefined ||
          !this.recipeServings || !this.recipeDifficulty) {
        this.errorMessage.set(this.translationService.translate('shop.addProduct.errors.fillRecipeFields'));
        return;
      }
    }

    this.isUploading.set(true);

    try {
      // Convert image to base64
      const base64Image = await this.convertFileToBase64(this.newImg);

      const productId = Date.now();
      const newProduct = {
        id: productId,
        title: this.newTitle,
        price: this.newPrice,
        quantity: this.newQuantity,
        img: base64Image // Store base64 string instead of URL
      };

      // Add product
      await this.productService.addProduct(newProduct);

      // Add recipe if included
      if (this.includeRecipe) {
        const ingredients = this.recipeIngredients
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);
        
        const instructions = this.recipeInstructions
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);

        await this.recipeService.addRecipeDirectly({
          name: this.newTitle,
          category: this.recipeCategory,
          ingredients: ingredients,
          instructions: instructions,
          image: base64Image,
          productId: productId,
          prepTime: this.recipePrepTime,
          cookTime: this.recipeCookTime,
          servings: this.recipeServings,
          difficulty: this.recipeDifficulty
        });
      }

      this.successMessage.set(this.includeRecipe 
        ? this.translationService.translate('shop.addProduct.success.productAndRecipe')
        : this.translationService.translate('shop.addProduct.success.product'));
      this.productAdded.emit(newProduct);

      // Close modal after a short delay
      setTimeout(() => {
        this.close();
      }, 1500);

    } catch (err) {
      console.error('Error adding product:', err);
      this.errorMessage.set(this.translationService.translate('shop.addProduct.errors.failed'));
    } finally {
      this.isUploading.set(false);
    }
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (1MB = 1048576 bytes)
      const maxSize = 1048576; // 1MB in bytes
      if (file.size > maxSize) {
        this.errorMessage.set(this.translationService.translate('shop.addProduct.errors.imageSize'));
        this.removeImage();
        return;
      }

      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        this.errorMessage.set(this.translationService.translate('shop.addProduct.errors.invalidImage'));
        this.removeImage();
        return;
      }

      this.errorMessage.set(null);
      this.newImg = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.newImg = undefined as any;
    this.imagePreview.set(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private resetForm() {
    this.newTitle = '';
    this.newPrice = 0;
    this.newQuantity = '';
    this.newImg = undefined as any;
    this.imagePreview.set(null);
    this.includeRecipe = false;
    this.recipeCategory = '';
    this.recipeIngredients = '';
    this.recipeInstructions = '';
    this.recipePrepTime = 0;
    this.recipeCookTime = 0;
    this.recipeServings = 0;
    this.recipeDifficulty = 'Medium';
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
