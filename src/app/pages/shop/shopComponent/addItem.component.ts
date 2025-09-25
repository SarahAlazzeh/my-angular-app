import { Component, Input, Output, EventEmitter } from "@angular/core";
import { products } from "../../../../data/productsItme/product";
import { Iproduct } from "../../../../data/productInterface/iproduct";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'addItem-shop',
  standalone: true,
  imports:[ FormsModule ],
  templateUrl: './addItem.component.html',
  styleUrl: './addItem.component.css'
})

export class AdditemComponent{
  @Output() productAdded = new EventEmitter<Iproduct>();

  productList: Iproduct[] = products;
  newId: number = 0;
  newImg: string = "";
  newTitle: string = "";
  newPrice: number = 0;
  newQuantity: string = "";

  addProduct() : void{
    const newItem: Iproduct = {
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
