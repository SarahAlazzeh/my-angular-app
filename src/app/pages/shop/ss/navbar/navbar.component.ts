import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { SearchPipe } from '../../../../../data/searchPipe/searchPipe.pipe';
import { Iproduct } from '../../../../../data/productInterface/iproduct';
import { products } from '../../../../../data/productsItme/product';
import { FormsModule, NgModel } from "@angular/forms";
// import {  } from 'stream';
// import { CardshopComponent } from '../../shopComponent/card/card.component';

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarshopComponent {
  @Output() sendSearchInput : EventEmitter<string> = new EventEmitter ()
  productList: Iproduct[] = products;
  inputSearch : string = "" ;
  key() : void{
    this.sendSearchInput.emit(this.inputSearch)
  }

}
