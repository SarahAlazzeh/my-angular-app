import { Component } from "@angular/core";
import { CurrencyPipe, NgClass } from "@angular/common";
import { ShopService } from "../../../../features/shop";
import { Product } from "../../../../core/models/product.interface";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ CurrencyPipe, NgClass ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})

export class OrderComponent{

constructor( private shopService : ShopService ){}

name : string = "";
discription : string = "";
quantity !: number ;
price !: number;
priceAdded !: number;
priceRemove !: number;
total!: number ;
delete: boolean = false;

addItem() : void{
  this.total += this.priceAdded;
  this.quantity += 1;
  if(this.delete === true){
    this.toggel()
  }
};

removeItem() :void{
  if(this.total === 1){
    this.toggel()
  }
  else{
    this.total -= this.priceRemove ;
    this.quantity -= 1;
  }
};

toggel() : void{
  this.delete =! this.delete;
}

trash(): void{
  this.toggel()
}

addProcact(){
  // this.shopService.addToCart()
  // const productInfo : Product = {
    // name = this.shopService.addToCart(p)
    // discription
    // quantity
    // price
    // total = this.shopService.getCartTotal()
  // }
}

}
