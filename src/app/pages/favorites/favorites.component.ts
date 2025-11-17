import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FavoritesService } from "../../core/services/favorites.service";
import { Product } from "../../core/models/product.interface";
import { Subscription } from "rxjs";
import { UserdataService } from "../../core/services/userData.service";
import { ShopService } from "../../features/shop/services/shop.service";
import { products } from "../../core/models/product.data";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ RouterLink, CommonModule, CurrencyPipe ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})

export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Product[] = [];
  isLoggedIn: boolean = false;
  private favoritesSubscription?: Subscription;
  @ViewChild('cartAlert') cartAlert!: ElementRef;
  products: Product[] = products;

  constructor(
    private favoritesService: FavoritesService,
    private userdataService: UserdataService,
    private router: Router,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userdataService.isLoggedIn();
    
    this.favoritesSubscription = this.favoritesService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  removeFavorite(productId: number): void {
    this.favoritesService.removeFromFavorites(productId);
  }

  viewRecipeDetails(productId: number): void {
    this.router.navigate(['/recipe-details', productId]);
  }

  addToCart(productId: number): void {
    const loginUser = this.userdataService.isLoggedIn();
    
    if (loginUser === true) {
      const selectedProduct = this.products.find(p => p.id === productId);
      if (selectedProduct) {
        this.shopService.addToCart(selectedProduct);
        // Show alert
        if (this.cartAlert) {
          this.cartAlert.nativeElement.style.display = 'flex';
          setTimeout(() => {
            if (this.cartAlert) {
              this.cartAlert.nativeElement.style.display = 'none';
            }
          }, 3000);
        }
      }
    } else {
      // Redirect to login or show login modal
      alert('Please login to add items to cart');
    }
  }
}
