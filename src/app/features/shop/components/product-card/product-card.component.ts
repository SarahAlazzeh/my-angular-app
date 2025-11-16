import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { products } from "../../../../core/models/product.data";
import { Product } from "../../../../core/models/product.interface";
import { CurrencyPipe } from "@angular/common";
import { SearchPipe } from "../../../../shared/pipes/search.pipe";
import { TranslatePipe } from "../../../../shared/pipes/translate.pipe";
import { UserdataService } from "../../../../core/services/userData.service";
import { ShopService } from "../../services/shop.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports:[ CurrencyPipe, SearchPipe, TranslatePipe ],
  templateUrl: './product-card.component.html',
  styleUrl:'./product-card.component.css'
})

export class ProductCardComponent{

  products: Product[] = products;
  @Input() search : string = "";
  @ViewChild ('loginAlert') loginAlert! :ElementRef;
  @ViewChild ('alertCart') alertCart! :ElementRef;
  constructor(private el :ElementRef,
    private userdataService : UserdataService,
    private shopService : ShopService
  ){}
  loginUser!:boolean;
  // isAnimating: boolean = false;
  sInput: string = "";
  // @Input() data!: Iproduct;
  addToCart(id: number) : void {
    this.loginUser = this.userdataService.isLoggedIn()

    if(this.loginUser===true ){
      this.alertCart.nativeElement.style.display= 'flex';
      setTimeout(() => {
      this.alertCart.nativeElement.style.display='none';
    }, 3500);
    const selectedProduct = this.products.find(p => p.id === id);
    if( selectedProduct ){
      this.shopService.addToCart(selectedProduct);
    }
    } else{
      this.loginAlert.nativeElement.style.display= 'flex';
    setTimeout(() => {
      this.loginAlert.nativeElement.style.display='none';
    }, 3500);

    }
  }
}
