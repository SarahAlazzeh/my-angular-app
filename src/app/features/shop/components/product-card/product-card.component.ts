import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { products } from "../../../../core/models/product.data";
import { Product } from "../../../../core/models/product.interface";
import { CurrencyPipe } from "@angular/common";
import { SearchPipe } from "../../../../shared/pipes/search.pipe";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";
import { UserdataService } from "../../../../core/services/userData.service";
import { ShopService } from "../../services/shop.service";
import { Router } from "@angular/router";
import { FavoritesService } from "../../../../core/services/favorites.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports:[ CurrencyPipe, SearchPipe, TranslatePipe ],
  templateUrl: './product-card.component.html',
  styleUrl:'./product-card.component.css'
})

export class ProductCardComponent implements OnInit, OnDestroy {
  products: Product[] = products;
  @Input() search : string = "";
  @ViewChild ('loginAlert') loginAlert! :ElementRef;
  @ViewChild ('alertCart') alertCart! :ElementRef;
  @ViewChild ('alertFavorite') alertFavorite! :ElementRef;
  
  favoriteStatuses: Map<number, boolean> = new Map();
  private favoritesSubscription?: Subscription;
  
  constructor(
    private el :ElementRef,
    private userdataService : UserdataService,
    private shopService : ShopService,
    private router: Router,
    private favoritesService: FavoritesService
  ){}
  
  loginUser!:boolean;
  sInput: string = "";

  ngOnInit(): void {
    // Subscribe to favorites changes
    this.favoritesSubscription = this.favoritesService.getFavorites().subscribe(favorites => {
      this.products.forEach(product => {
        this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
      });
    });
    
    // Initialize favorite statuses
    this.products.forEach(product => {
      this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
    });
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }
  addToCart(id: number) : void {
    this.loginUser = this.userdataService.isLoggedIn()

    if(this.loginUser===true ){
      this.alertCart.nativeElement.style.display= 'flex';
      setTimeout(() => {
      this.alertCart.nativeElement.style.display='none';
    }, 3500);
    const selectedProduct = this.products.find(p => p.id === id);
    if( selectedProduct ){
      this.shopService.addToCart(selectedProduct);
    }
    } else{
      this.loginAlert.nativeElement.style.display= 'flex';
    setTimeout(() => {
      this.loginAlert.nativeElement.style.display='none';
    }, 3500);

    }
  }

  viewRecipeDetails(productId: number): void {
    this.router.navigate(['/recipe-details', productId]);
  }

  toggleFavorite(productId: number): void {
    this.loginUser = this.userdataService.isLoggedIn();
    
    if (this.loginUser === true) {
      const selectedProduct = this.products.find(p => p.id === productId);
      if (selectedProduct) {
        this.favoritesService.toggleFavorite(selectedProduct);
        const isFavorite = this.favoritesService.isFavorite(productId);
        
        // Show alert
        if (this.alertFavorite) {
          this.alertFavorite.nativeElement.style.display = 'flex';
          setTimeout(() => {
            if (this.alertFavorite) {
              this.alertFavorite.nativeElement.style.display = 'none';
            }
          }, 3000);
        }
      }
    } else {
      this.loginAlert.nativeElement.style.display = 'flex';
      setTimeout(() => {
        this.loginAlert.nativeElement.style.display = 'none';
      }, 3500);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteStatuses.get(productId) || false;
  }
}