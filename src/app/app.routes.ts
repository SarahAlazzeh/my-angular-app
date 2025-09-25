import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.Component';
import { NotfoundComponent } from './pages/notFound/notFound.component';
import { ShopComponent } from './pages/shop/shop.Component';
import { CartComponent } from './pages/cart/cart.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SharerecipeComponent } from './pages/shareRecipe/shareRecipe.component';

export const routes: Routes = [
  { path: 'home' , component: HomeComponent , title: 'Home'},
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'shop' , component: ShopComponent , title: 'Shop'},
  { path: 'cart' , component: CartComponent , title: 'Cart'},
  { path: 'recipe' , component: RecipeComponent , title: 'Recipe'},
  { path: 'sharerecipe' , component: SharerecipeComponent , title: 'Share Recipe'},

  { path: '**' , component: NotfoundComponent , title: 'Not Found '}
];
