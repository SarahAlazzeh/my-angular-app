import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, Output,EventEmitter } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";
import { DelivaryCity, delivaryDetalis } from "../../../../core/models/delivary.data";
// import {  } from "node:stream";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe , CommonModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent{
  total: number = 0;
  productPrice :number=0;
  delivary : number = 0;
  totalPrice: number= 0;
  // check: boolean = false;
  checkCity:boolean =false;
  @Output() check:EventEmitter<any> = new EventEmitter();
  delivaryCities : DelivaryCity[] = delivaryDetalis;
  addItem(price:number){
    this.totalPrice += price
  }

  checkOut(){
    this.check.emit(true);
  }

  toggelMenu(){
    this.checkCity = !this.checkCity;
  }

  chooseCity( city: DelivaryCity ){
    this.checkCity = !this.checkCity;
    this.delivary = city.delivaryPrice ;
    this.total = this.totalPrice + this.delivary;
    // this.delivary= this.delivaryCities
  }

}
