import { Component } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { RecipecardComponent } from "./recipeComponent/recipeCard/recipeCard.component";
import { UserdataService } from "../../core/services/userData.service";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports:[ NavbarComponent, FooterComponent, TranslatePipe, 
    RecipecardComponent ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent{
  constructor( private userdataService : UserdataService,){}

  admin : boolean = false;
    ngOnInit(){
      this.userdataService.isAdmin$.subscribe(value => {
        console.log('is admin ' , value)
        this.admin= value;
      })
    }

}
