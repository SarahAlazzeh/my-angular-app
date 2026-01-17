import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { TranslatePipe } from "../../shared/pipes/translate.pipe";
import { RecipecardComponent } from "./recipeComponent/recipeCard/recipeCard.component";
import { UserdataService } from "../../core/services/userData.service";
import { SearchBarComponent, SortOption } from "../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports:[ NavbarComponent, FooterComponent, TranslatePipe, 
    RecipecardComponent, SearchBarComponent ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent implements OnInit {
  searchValue: string = "";
  sortOption: SortOption = 'none';
  filterOption: string = 'all';
  admin : boolean = false;

  filterOptions: string[] = [
    'shareRecipe.types.coldDesserts',
    'shareRecipe.types.bakedDesserts',
    'shareRecipe.types.pastries',
    'shareRecipe.types.cookies'
  ];

  constructor( private userdataService : UserdataService,){}

  ngOnInit(){
    this.userdataService.isAdmin$.subscribe(value => {
      console.log('is admin ' , value)
      this.admin= value;
    })
  }

  onSearchChange(value: string): void {
    this.searchValue = value;
  }

  onSortChange(sort: SortOption): void {
    this.sortOption = sort;
  }

  onFilterChange(filter: string): void {
    this.filterOption = filter;
  }
}
