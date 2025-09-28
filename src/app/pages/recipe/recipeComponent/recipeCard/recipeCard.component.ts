import { Component } from "@angular/core";
import { Product } from "../../../../core/models/product.interface";
import { products } from "../../../../core/models/product.data";
import { SearchPipe } from "../../../../shared/pipes/search.pipe";


@Component({
  selector: 'recipe-card',
  standalone: true,
  imports: [ SearchPipe  ],
  templateUrl: './recipeCard.component.html',
  styleUrls: ['./recipeCard.component.css']
})

export class RecipecardComponent{
  recipeProducts: Product[] = products;
  recipeSearch: string ="";
  favIcon: string ="favorite_border";
  favClick() : void{
    this.favIcon = "favorite";
  }
}
