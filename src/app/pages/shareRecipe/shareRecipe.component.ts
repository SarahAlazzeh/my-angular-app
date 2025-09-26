import { Component } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-sharerecipe',
  standalone: true,
  imports:[ NavbarComponent, FooterComponent, TranslatePipe ],
  templateUrl: './shareRecipe.component.html',
  styleUrl: './shareRecipe.component.css'
})

export class SharerecipeComponent{

}
