// import { CurrencyPipe } from "@angular/common";
import { Component, ElementRef, Input } from "@angular/core";
import { products } from "../../../../../data/productsItme/product";
import { Iproduct } from "../../../../../data/productInterface/iproduct";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'shop-card',
  standalone: true,
  imports:[ CurrencyPipe ],
  templateUrl: './card.component.html',
  styleUrl:'./card.component.css'
})

export class CardshopComponent{
  products: Iproduct[] = products;
  constructor(private el :ElementRef){}

  // @Input() data!: Iproduct;
  addToCart() : void {
    this.el.nativeElement.style.background="red";
  }
}
