import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
// import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
// import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { CheckoutComponent } from "./component/checkout/checkout.component";
import { NgClass } from "@angular/common";
import { OrderComponent } from "./component/order-item/order-item.component";
import { PaymentComponent } from "./component/payment/payment.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ TranslatePipe, CheckoutComponent, NgClass, OrderComponent, PaymentComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent{
  itemsNumber: number =0;
  value :boolean = false;
  cancle:boolean= true;

  incItems() : void {
    this.itemsNumber += 1
    if(this.itemsNumber>= 1){
    }
  };

  onChecked(checked:boolean){
    this.value=checked;
    this.cancle= true;
  }

  onClikced(clicked:boolean){
    this.cancle=clicked;
  }
}
