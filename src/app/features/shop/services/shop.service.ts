import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../../core/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<string>('all');
  public selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor(private cartService: CartService) { }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuery$;
  }

  setSelectedCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }

  getSelectedCategory(): Observable<string> {
    return this.selectedCategory$;
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.cartService.addToCart(product, quantity);
  }

  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  getCartTotal(): number {
    return this.cartService.getTotalPrice();
  }
}
