import { Component, inject, signal } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass, CommonModule } from "@angular/common";
import { RecipeService } from "../../core/services/recipe.service";
import { UserdataService } from "../../core/services/userData.service";
import { TranslationService } from "../../core/services/translation.service";

@Component({
  selector: 'app-sharerecipe',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, TranslatePipe, NgClass, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './shareRecipe.component.html',
  styleUrl: './shareRecipe.component.css'
})

export class SharerecipeComponent{
  private recipeService = inject(RecipeService);
  private userDataService = inject(UserdataService);
  private translationService = inject(TranslationService);

  constructor(){
    this.initFormControl();
    this.initformGroup();
  }

  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  selectedFile: File | null = null;
  imagePreview = signal<string | null>(null);

  newRecipe!: string;
  newName!: string;
  newtype!: string;
  newingredients!: string;
  newPrepare!: string;
  newPhoto!: string;
  newEmail!: string;

  recipe! : FormGroup;
  name !: FormControl;
  type !: FormControl;
  ingredients !: FormControl;
  prepare !: FormControl;
  photo !: FormControl;
  email !: FormControl;

  initFormControl(){
    this.name = new FormControl('',[ Validators.required]);
    this.ingredients = new FormControl ('', [ Validators.required]);
    this.type = new FormControl ('', [Validators.required]);
    this.prepare = new FormControl ('', [Validators.required]);
    this.photo = new FormControl ('', []);
    this.email = new FormControl ('', [Validators.email])
  }

  initformGroup(){
    this.recipe = new FormGroup ({
      name : this.name,
      type: this.type,
      ingredients : this.ingredients,
      prepare : this.prepare,
      photo : this.photo,
      email : this.email,
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (1MB)
      const maxSize = 1048576;
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

      this.selectedFile = file;
      this.photo.setValue(file.name);
      this.errorMessage.set(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreview.set(null);
    this.photo.setValue('');
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
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

  async onSubmit() {
    if (!this.recipe.valid) {
      this.errorMessage.set('fillRequired');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      let imageBase64 = '';

      // Convert image to base64 if provided
      if (this.selectedFile) {
        imageBase64 = await this.convertFileToBase64(this.selectedFile);
      }

      // Get current user ID
      const userId = this.userDataService.getCurrentUserId();

      // Submit recipe for review
      await this.recipeService.submitRecipe({
        name: this.recipe.get('name')?.value,
        type: this.recipe.get('type')?.value,
        ingredients: this.recipe.get('ingredients')?.value,
        prepare: this.recipe.get('prepare')?.value,
        photo: imageBase64, // Store base64 string instead of URL
        email: this.recipe.get('email')?.value || undefined
      }, userId || undefined);

      this.successMessage.set('success');
      
      // Reset form
      this.recipe.reset();
      this.removeImage();

    } catch (error: any) {
      console.error('Error submitting recipe:', error);
      this.errorMessage.set('error');
    } finally {
      this.isLoading.set(false);
    }
  }
}
