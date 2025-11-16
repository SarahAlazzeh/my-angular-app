import { Component } from "@angular/core";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { products } from "../../core/models/product.data";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { UserdataService } from "../../core/services/userData.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports:[ ProductCardComponent, AddProductComponent, NavbarComponent, FooterComponent, TranslatePipe, CommonModule ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent{
  showCard : boolean = false;
  productList = products;
  searchNav: string= "";
  admin : boolean = false;
  reciveFromNav(msg: string){
    this.searchNav = msg;
  }
  constructor( private userdataService : UserdataService,){}

  ngDoCheck(){
    this.admin = this.userdataService.isLooginAdmin();
  }

  onProductAdded(newProduct: any) {
    this.productList.push(newProduct); // نضيف الكارد
    this.showCard = true; // نظهر الكروت
  }

}

