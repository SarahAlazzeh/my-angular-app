import { Component, Input, Output, EventEmitter } from "@angular/core";
import { products } from "../../../../core/models/product.data";
import { Product } from "../../../../core/models/product.interface";
import { FormsModule } from "@angular/forms";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports:[ FormsModule, TranslatePipe ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent{
  @Output() productAdded = new EventEmitter<Product>();

  productList: Product[] = products;
  newId: number = 0;
  newImg: string = "";
  newTitle: string = "";
  newPrice: number = 0;
  newQuantity: string = "";

  addProduct() : void{
    const newItem: Product = {
      id: this.newId++,
      title: this.newTitle,
      price: this.newPrice,
      quantity: this.newQuantity,
      img: this.newImg
    };
    this.productList.push(newItem);
    this.productAdded.emit(newItem);
        //reset input
    this.newTitle = "";
    this.newPrice = 0;
    this.newQuantity = "";
    this.newImg = "";
  }
}
