import { Component, inject, signal } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass, CommonModule } from "@angular/common";
import { RecipeService } from "../../core/services/recipe.service";
import { UserdataService } from "../../core/services/userData.service";

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

  constructor(){
    this.initFormControl();
    this.initformGroup();
  }

  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  selectedFile: File | null = null;

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
        this.errorMessage.set('Image size must be less than 1MB. Please choose a smaller image.');
        return;
      }

      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        this.errorMessage.set('Please select a valid image file.');
        return;
      }

      this.selectedFile = file;
      this.photo.setValue(file.name);
      this.errorMessage.set(null);
    }
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
      let imageUrl = '';

      // Upload image if provided
      if (this.selectedFile) {
        imageUrl = await this.recipeService.uploadRecipeImage(this.selectedFile);
      }

      // Get current user ID
      const userId = this.userDataService.getCurrentUserId();

      // Submit recipe for review
      await this.recipeService.submitRecipe({
        name: this.recipe.get('name')?.value,
        type: this.recipe.get('type')?.value,
        ingredients: this.recipe.get('ingredients')?.value,
        prepare: this.recipe.get('prepare')?.value,
        photo: imageUrl,
        email: this.recipe.get('email')?.value || undefined
      }, userId || undefined);

      this.successMessage.set('success');
      
      // Reset form
      this.recipe.reset();
      this.selectedFile = null;
      const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error: any) {
      console.error('Error submitting recipe:', error);
      this.errorMessage.set('error');
    } finally {
      this.isLoading.set(false);
    }
  }
}
