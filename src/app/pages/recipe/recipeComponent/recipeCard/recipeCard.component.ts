import { Component, OnInit, OnDestroy, ElementRef, ViewChild, computed, signal, input } from "@angular/core";
import { Product } from "../../../../core/models/product.interface";
import { products } from "../../../../core/models/product.data";
import { FavoritesService } from "../../../../core/services/favorites.service";
import { UserdataService } from "../../../../core/services/userData.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SearchService, SortOption } from "../../../../core/services/search.service";

@Component({
  selector: 'recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipeCard.component.html',
  styleUrls: ['./recipeCard.component.css']
})

export class RecipecardComponent implements OnInit, OnDestroy {
  recipeProducts = signal<Product[]>(products);
  search = input<string>("");
  sortOption = input<SortOption>('none');
  filterOption = input<string>('all');
  favoriteStatuses: Map<number, boolean> = new Map();
  private favoritesSubscription?: Subscription;
  @ViewChild('loginAlert') loginAlert!: ElementRef;
  @ViewChild('favoriteAlert') favoriteAlert!: ElementRef;

  constructor(
    private favoritesService: FavoritesService,
    private userdataService: UserdataService,
    private router: Router
  ) {}

  filteredAndSortedProducts = computed(() => {
    let result = [...this.recipeProducts()];
    const searchValue = this.search();
    const sortValue = this.sortOption();
    
    if (searchValue && searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        (product.name && product.name.toLowerCase().includes(searchLower))
      );
    }

    if (sortValue !== 'none') {
      result = this.sortProducts(result, sortValue);
    }

    return result;
  });

  ngOnInit(): void {
    this.favoritesSubscription = this.favoritesService.getFavorites().subscribe(() => {
      this.recipeProducts().forEach(product => {
        this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
      });
    });
    
    this.recipeProducts().forEach(product => {
      this.favoriteStatuses.set(product.id, this.favoritesService.isFavorite(product.id));
    });
  }

  private sortProducts(products: Product[], sortOption: SortOption): Product[] {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  toggleFavorite(productId: number): void {
    const loginUser = this.userdataService.isLoggedIn();
    
    if (loginUser === true) {
      const selectedProduct = this.recipeProducts().find(p => p.id === productId);
      if (selectedProduct) {
        this.favoritesService.toggleFavorite(selectedProduct);
        const isFavorite = this.favoritesService.isFavorite(productId);
        
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
