import { Component } from "@angular/core";
import { CardshopComponent } from "./shopComponent/card/card.component";
// import { Iproduct } from "../../../data/productInterface/iproduct";
import { products } from "../../../data/productsItme/product";
import { AdditemComponent } from "./shopComponent/addItem.component";
import { NavbarshopComponent } from "./ss/navbar/navbar.component";
import { FootershopComponent } from "./ss/footer/footer.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports:[ CardshopComponent, AdditemComponent, NavbarshopComponent, FootershopComponent ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent{
  showCard : boolean = false;
  productList = products;

  onProductAdded(newProduct: any) {
    this.productList.push(newProduct); // نضيف الكارد
    this.showCard = true; // نظهر الكروت
  }
}

