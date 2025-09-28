import { Component } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { RecipecardComponent } from "./recipeComponent/recipeCard/recipeCard.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports:[ NavbarComponent, FooterComponent, TranslatePipe, RecipecardComponent ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent{

}
