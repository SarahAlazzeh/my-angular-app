import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
// import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
// import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { checkoutComponent } from "./component/checkout/checkout.component";
import { NgClass } from "@angular/common";
import { OrderComponent } from "./component/order-item/order-item.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ TranslatePipe, checkoutComponent, NgClass, OrderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent{
  itemsNumber: number =0;

  incItems() : void {
    this.itemsNumber += 1
    if(this.itemsNumber>= 1){

    }
  };
}
