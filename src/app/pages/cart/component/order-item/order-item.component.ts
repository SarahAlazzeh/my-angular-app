import { Component, Input, OnInit } from "@angular/core";
import { CurrencyPipe, NgClass } from "@angular/common";
import { CartService, CartItem } from "../../../../core/services/cart.service";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ CurrencyPipe, NgClass ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})

export class OrderComponent implements OnInit {
  @Input() cartItem!: CartItem;

  constructor(private cartService: CartService) {}

  name: string = "";
  description: string = "";
  quantity: number = 0;
  price: number = 0;
  total: number = 0;
  delete: boolean = false;
  productImage: string = "";

  ngOnInit(): void {
    if (this.cartItem) {
      this.name = this.cartItem.product.title;
      this.description = this.cartItem.product.description || "";
      this.quantity = this.cartItem.quantity;
      this.price = this.cartItem.product.price;
      this.total = this.price * this.quantity;
      this.productImage = this.cartItem.product.img || "";
    }
  }

  addItem(): void {
    this.quantity += 1;
    this.total = this.price * this.quantity;
    if (this.cartItem) {
      this.cartService.updateQuantity(this.cartItem.product.id, this.quantity);
    }
    if (this.delete === true) {
      this.toggel();
    }
  }

  removeItem(): void {
    if (this.quantity <= 1) {
      this.toggel();
    } else {
      this.quantity -= 1;
      this.total = this.price * this.quantity;
      if (this.cartItem) {
        this.cartService.updateQuantity(this.cartItem.product.id, this.quantity);
      }
    }
  }

  toggel(): void {
    this.delete = !this.delete;
  }

  trash(): void {
    if (this.cartItem) {
      this.cartService.removeFromCart(this.cartItem.product.id);
    }
    this.toggel();
  }
}
