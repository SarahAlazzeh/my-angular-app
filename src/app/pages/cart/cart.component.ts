import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { CheckoutComponent } from "./component/checkout/checkout.component";
import { NgClass } from "@angular/common";
import { OrderComponent } from "./component/order-item/order-item.component";
import { PaymentComponent } from "./component/payment/payment.component";
import { ShopService } from "../../features/shop";
import { CartService, CartItem } from "../../core/services/cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TranslatePipe, CheckoutComponent, NgClass,
    OrderComponent, PaymentComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private shopService: ShopService,
    private cartService: CartService
  ) {}
  
  cartItems: CartItem[] = [];
  itemsNumber: number = 0;
  value: boolean = false;
  cancle: boolean = true;
  showAlert: boolean = false;
  fadeOut: boolean = false;
  private cartSubscription?: Subscription;

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.itemsNumber = this.cartService.getCartItemCount();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  checkOut(checked: boolean) {
    this.value = checked;
    this.cancle = true;
  }

  onClikced(clicked: boolean) {
    this.cancle = clicked;
  }

  noItemAlert(click: boolean) {
    if (this.itemsNumber === 0) {
      this.showAlert = click;
      setTimeout(() => {
        this.fadeOut = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1000);
      }, 2000);
    } else {
      this.checkOut(true);
    }
  }

  closeAlert() {
    this.fadeOut = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 500);
  }
}
