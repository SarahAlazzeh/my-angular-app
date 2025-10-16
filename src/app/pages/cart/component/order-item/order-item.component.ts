import { Component } from "@angular/core";
import { CurrencyPipe, NgClass } from "@angular/common";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ CurrencyPipe, NgClass ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})

export class OrderComponent{
name : string = "cookies";
discription : string = "Classic with chocolate chips";
quantity : number = 1;
price : number = 1;
priceAdded: number = 1;
priceRemove: number =1 ;
delete: boolean = false;

addItem() : void{
  this.price += this.priceAdded;
  this.quantity += 1;
};

removeItem() :void{
  if(this.price === 1){
    this.toggel()
  }
  else{
    this.price -= this.priceRemove ;
    this.quantity -= 1;
  }
};

toggel() : void{
  this.delete =! this.delete;
}

trash(): void{
this.toggel()

}

}
