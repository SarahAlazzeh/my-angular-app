import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from "@angular/core";
import { Product } from "../../../../core/models/product.interface";
import { products } from "../../../../core/models/product.data";
import { SearchPipe } from "../../../../shared/pipes/search.pipe";
import { FavoritesService } from "../../../../core/services/favorites.service";
import { UserdataService } from "../../../../core/services/userData.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SearchService } from "../../../../core/services/search.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'recipe-card',
  standalone: true,
  imports: [ SearchPipe , NgIf ],
  templateUrl: './recipeCard.component.html',
  styleUrls: ['./recipeCard.component.css']
})

export class RecipecardComponent implements OnInit, OnDestroy {
  recipeProducts: Product[] = products;
  recipeSearch: string = "";
  favoriteStatuses: Map<number, boolean> = new Map();
  private favoritesSubscription?: Subscription;
  @ViewChild('loginAlert') loginAlert!: ElementRef;
  @ViewChild('favoriteAlert') favoriteAlert!: ElementRef;

  constructor(
    private favoritesService: FavoritesService,
    private userdataService: UserdataService,
    private router: Router,
    private searchService : SearchService
    
  ) {}

  searchOn: boolean = false ;
  searchValue: string = "";

  ngOnInit(): void {
    // Subscribe to favorites changes
    this.favoritesSubscription = this.favoritesService.getFavorites().subscribe(() => {
      this.recipeProducts.forEach(product => {
        this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
      });
    });
    
    // Initialize favorite statuses
    this.recipeProducts.forEach(product => {
      this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
    });

    this.searchService.getSearchProduct().subscribe(value => {
      this.searchValue = value 
      this.searchOn = value.trim().length > 0 
      })
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  toggleFavorite(productId: number): void {
    const loginUser = this.userdataService.isLoggedIn();
    
    if (loginUser === true) {
      const selectedProduct = this.recipeProducts.find(p => p.id === productId);
      if (selectedProduct) {
        this.favoritesService.toggleFavorite(selectedProduct);
        const isFavorite = this.favoritesService.isFavorite(productId);
        
        // Show alert
        if (this.favoriteAlert) {
          this.favoriteAlert.nativeElement.style.display = 'flex';
          setTimeout(() => {
            if (this.favoriteAlert) {
              this.favoriteAlert.nativeElement.style.display = 'none';
            }
          }, 3000);
        }
      }
    } else {
      // Show login alert
      if (this.loginAlert) {
        this.loginAlert.nativeElement.style.display = 'flex';
        setTimeout(() => {
          if (this.loginAlert) {
            this.loginAlert.nativeElement.style.display = 'none';
          }
        }, 3500);
      }
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteStatuses.get(productId) || false;
  }

  viewRecipeDetails(productId: number): void {
    this.router.navigate(['/recipe-details', productId]);
  }
}
