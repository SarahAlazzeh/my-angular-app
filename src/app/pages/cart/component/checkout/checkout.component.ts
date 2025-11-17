import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";
import { DelivaryCity, delivaryDetalis } from "../../../../core/models/delivary.data";
import { CartService } from "../../../../core/services/cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit, OnDestroy {
  total: number = 0;
  productPrice: number = 0;
  delivary: number = 0;
  totalPrice: number = 0;
  checkCity: boolean = false;
  @Output() check: EventEmitter<any> = new EventEmitter();
  delivaryCities: DelivaryCity[] = delivaryDetalis;
  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe(() => {
      this.productPrice = this.cartService.getTotalPrice();
      this.totalPrice = this.productPrice;
      this.updateTotal();
    });
    this.productPrice = this.cartService.getTotalPrice();
    this.totalPrice = this.productPrice;
    this.updateTotal();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateTotal(): void {
    this.total = this.totalPrice + this.delivary;
  }

  checkOut() {
    this.check.emit(true);
  }

  toggelMenu() {
    this.checkCity = !this.checkCity;
  }

  chooseCity(city: DelivaryCity) {
    this.checkCity = !this.checkCity;
    this.delivary = city.delivaryPrice;
    this.updateTotal();
  }
}
