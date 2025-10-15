import { Component, Input, Output, EventEmitter } from "@angular/core";
import { products } from "../../../../core/models/product.data";
import { Product } from "../../../../core/models/product.interface";
import { FormsModule } from "@angular/forms";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-add-recipe-product',
  standalone: true,
  imports:[ FormsModule, TranslatePipe ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.comopnent.css'
})

export class AddrecipeProductComponent{
  @Output() productAdded = new EventEmitter<Product>();

  productList: Product[] = products;
  newId: number = 0;
  newImg: string = "";
  newTitle: string = "";
  newPrice: number = 0;
  newQuantity: string = "";

  addProduct() : void{
    const newProd: Product = {
      id: this.newId++,
      title: this.newTitle,
      img: this.newImg,
      price: this.newPrice,
      quantity: this.newQuantity,
    };
    this.productList.push(newProd);
    this.newTitle = "";
    this.newImg = "";
    // this.productAdded.emit(newItem);
        //reset input
    // this.newPrice = 0;
    // this.newQuantity = "";
  }
}
