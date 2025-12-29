import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Product } from "../../../../core/models/product.interface";
import { CurrencyPipe } from "@angular/common";
import { SearchPipe } from "../../../../shared/pipes/search.pipe";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";
import { UserdataService } from "../../../../core/services/userData.service";
import { ShopService } from "../../services/shop.service";
import { Router } from "@angular/router";
import { FavoritesService } from "../../../../core/services/favorites.service";
import { Subscription } from "rxjs";
import { SearchService } from "../../../../core/services/search.service";
import { ProductService } from "../../../../core/services/product.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports:[ CurrencyPipe, SearchPipe, TranslatePipe ],
  templateUrl: './product-card.component.html',
  styleUrl:'./product-card.component.css'
})

export class ProductCardComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = true;
  @Input() search : string = "";
  @ViewChild ('loginAlert') loginAlert! :ElementRef;
  @ViewChild ('alertCart') alertCart! :ElementRef;
  @ViewChild ('alertFavorite') alertFavorite! :ElementRef;

  favoriteStatuses: Map<number, boolean> = new Map();
  private favoritesSubscription?: Subscription;
  private productsSubscription?: Subscription;
  private loadingSubscription?: Subscription;

  constructor(
    private el :ElementRef,
    private userdataService : UserdataService,
    private shopService : ShopService,
    private router: Router,
    private favoritesService: FavoritesService,
    private searchService : SearchService,
    private productService: ProductService
  ){}

  searchOn: boolean = false ;
  searchValue: string = "";

  loginUser!:boolean;
  sInput: string = "";

  admin : boolean = false;

  ngOnInit(): void {
    // Subscribe to loading state
    this.loadingSubscription = this.productService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });

    // Load products from service (includes Firestore products)
    this.productsSubscription = this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      
      // Update favorite statuses when products change
      this.products.forEach(product => {
        this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
      });
    });

    // Subscribe to favorites changes
    this.favoritesSubscription = this.favoritesService.getFavorites().subscribe(favorites => {
      this.products.forEach(product => {
        this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
      });
    });

    this.userdataService.isAdmin$.subscribe(value => {
      console.log('is admin ' , value)
      this.admin= value;
    })

    this.searchService.getSearchProduct().subscribe(value => {
      this.searchValue = value.toLowerCase()
      this.searchOn = value.trim().length > 0
    })
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
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

  async deleteProduct(product: Product): Promise<void> {
    if (!this.admin) {
      return;
    }

    // Check if product is from Firestore
    if (!product.firestoreId) {
      return; // Can't delete static products
    }

    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) {
      return;
    }

    try {
      await this.productService.deleteProduct(product);
      // Product will be removed from the list automatically via subscription
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  }

  isFromFirestore(product: Product): boolean {
    return !!product.firestoreId;
  }
}
