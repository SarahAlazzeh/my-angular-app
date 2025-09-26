import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports:[ RouterLink, NavbarComponent, FooterComponent, TranslatePipe ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent{

}
