import { Component, ElementRef, Input } from "@angular/core";
import { products } from "../../../../core/models/product.data";
import { Product } from "../../../../core/models/product.interface";
import { CurrencyPipe } from "@angular/common";
import { SearchPipe } from "../../../../shared/pipes/search.pipe";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports:[ CurrencyPipe, SearchPipe, TranslatePipe ],
  templateUrl: './product-card.component.html',
  styleUrl:'./product-card.component.css'
})

export class ProductCardComponent{
  products: Product[] = products;
  @Input() search : string = "";
  constructor(private el :ElementRef){}
  // isAnimating: boolean = false;
  sInput: string = "";
  // @Input() data!: Iproduct;
  addToCart() : void {
    // this.isAnimating = false;
    // setTimeout(() => {
    //   this.isAnimating = true;
    // }, 0);

    // setTimeout(() => {
    //   this.isAnimating = false;
    // }, 1500);
  }
}
