import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Iproduct } from "../../../../data/productInterface/iproduct";
import { products } from "../../../../data/productsItme/product";

@Component({
  selector: "home-main",
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './main.component.html',
  styleUrl:'./main.component.css'
})

export class MainhomeComponent{
  product : Iproduct[]= products;
  m : number = 0;
  // for (m ; m < 2; m++) {
  //   const element = products[m];
  // }


}
