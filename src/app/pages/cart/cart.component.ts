import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
// import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
// import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { CheckoutComponent } from "./component/checkout/checkout.component";
import { NgClass, NgIf } from "@angular/common";
import { OrderComponent } from "./component/order-item/order-item.component";
import { PaymentComponent } from "./component/payment/payment.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TranslatePipe, CheckoutComponent, NgClass,
    OrderComponent, PaymentComponent, RouterLink, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent{
  itemsNumber: number =0;
  value :boolean = false;
  cancle:boolean= true;
  showAlert:boolean = false;
  fadeOut:boolean = false;


  incItems() : void {
    this.itemsNumber += 1
    if(this.itemsNumber>= 1){
    }
  };

  checkOut(checked:boolean){
    this.value=checked;
    this.cancle= true;
  }

  onClikced(clicked:boolean){
    this.cancle=clicked;
  }


  noItemAlert(click:boolean) {
    if(this.itemsNumber === 0){
      this.showAlert = click;
      setTimeout(() => {
      this.fadeOut = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 1000);
    }, 20000);
  } else this.checkOut(true)
  }

  closeAlert() {
  this.fadeOut = true;
  setTimeout(() => {
    this.showAlert = false;
    }, 500);  }

}
