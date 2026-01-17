import { Component, ViewChild, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { products } from "../../core/models/product.data";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { UserdataService } from "../../core/services/userData.service";
import { CommonModule } from "@angular/common";
import { SearchBarComponent, SortOption } from "../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports:[ ProductCardComponent, AddProductComponent, NavbarComponent,
    FooterComponent, TranslatePipe, CommonModule, SearchBarComponent ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent implements OnInit {
  @ViewChild('addProduct') addProductComponent!: AddProductComponent;
  
  showCard : boolean = false;
  productList = products;
  searchValue: string = "";
  sortOption: SortOption = 'none';
  filterOption: string = 'all';
  admin : boolean = false;

  filterOptions: string[] = [
    'shop.filters.bread',
    'shop.filters.desserts',
    'shop.filters.cakes',
    'shop.filters.cookies'
  ];
  
  constructor( 
    private userdataService : UserdataService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.userdataService.isAdmin$.subscribe(value => {
      this.admin= value;
    });

    this.route.queryParams.subscribe(params => {
      if (params['filter']) {
        const filterValue = params['filter'];
        const filterMap: { [key: string]: string } = {
          'cookies': 'shop.filters.cookies',
          'desserts': 'shop.filters.desserts',
          'cakes': 'shop.filters.cakes',
          'bread': 'shop.filters.bread'
        };
        
        if (filterMap[filterValue]) {
          this.filterOption = filterMap[filterValue];
          this.onFilterChange(this.filterOption);
        }
      }
    });
  }

  openAddProductModal() {
    this.addProductComponent.open();
  }

  closeAddProductModal() {
  }

  onProductAdded(newProduct: any) {
    this.productList.push(newProduct);
    this.showCard = true;
  }

  onSearchChange(value: string): void {
    this.searchValue = value;
  }

  onSortChange(sort: SortOption): void {
    this.sortOption = sort;
  }

  onFilterChange(filter: string): void {
    this.filterOption = filter;
  }
}

