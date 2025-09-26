import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components (standalone)
import { ShopComponent } from './shop.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AddProductComponent } from './components/add-product/add-product.component';

// Services
import { ShopService } from './services/shop.service';

// Shared
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Import standalone components
    ShopComponent,
    ProductCardComponent,
    AddProductComponent,
    NavbarComponent,
    FooterComponent,
    SearchPipe
  ],
  providers: [
    ShopService
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
