import { Component } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-sharerecipe',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, TranslatePipe, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './shareRecipe.component.html',
  styleUrl: './shareRecipe.component.css'
})

export class SharerecipeComponent{
constructor(){
  this.initFormControl();
  this.initformGroup();}

  isLoading: boolean = false;

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
    this.email = new FormControl ('', [])
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
}
