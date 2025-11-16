import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { APP_CONSTANTS } from '../constants/app.constants';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  public cart$ = this.cartSubject.asObservable();

  constructor() { }

  private loadCartFromStorage(): CartItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.CART_ITEMS);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  }

  private saveCartToStorage(cart: CartItem[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.CART_ITEMS, JSON.stringify(cart));
    }
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }

    this.cartSubject.next([...currentCart]);
    this.saveCartToStorage(currentCart);
  }


  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(item => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartSubject.next([...currentCart]);
        this.saveCartToStorage(currentCart);
      }
    }
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToStorage([]);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  getCartItemCount(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartSubject.value.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0);
  }
}
