import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchPipe } from '../../../../../data/searchPipe/searchPipe.pipe';
import { Iproduct } from '../../../../../data/productInterface/iproduct';
import { products } from '../../../../../data/productsItme/product';
import { FormsModule, NgModel } from "@angular/forms";
// import { CardshopComponent } from '../../shopComponent/card/card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule , SearchPipe, CurrencyPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarshopComponent {
  products: Iproduct[] = products;
  inputSearch : string = "" ;
}
