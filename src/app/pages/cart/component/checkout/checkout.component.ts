import { CurrencyPipe } from "@angular/common";
import { Component, Output,EventEmitter } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";
// import {  } from "node:stream";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent{
  total: number = 10;
  productPrice :number=0;
  shipping : number = 0;
  // check: boolean = false;
  @Output() check:EventEmitter<any> = new EventEmitter();

  addItem(price:number){
    this.total += price
  }

  checkOut(){
    this.check.emit(true);
  }

}
