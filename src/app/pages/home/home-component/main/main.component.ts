import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Product } from "../../../../core/models/product.interface";
import { products } from "../../../../core/models/product.data";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: "home-main",
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './main.component.html',
  styleUrl:'./main.component.css'
})

export class MainhomeComponent{
  product : Product[]= products;
}
