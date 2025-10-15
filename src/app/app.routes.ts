import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.Component';
import { NotfoundComponent } from './pages/notFound/notFound.component';
import { ShopComponent } from './features/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SigninComponent } from './shared/components/navbar/login/signIn/sign-in.component';
import { SignupComponent } from './shared/components/navbar/login/sighUp/sign-up.component';
import { SharerecipeComponent } from './pages/shareRecipe/shareRecipe.component';

export const routes: Routes = [
  { path: 'home' , component: HomeComponent , title: 'Home',
    children :[
      { path: '', redirectTo: 'signin', pathMatch: 'full'},
      { path : 'signin' , component: SigninComponent},
    { path : 'signup', component: SignupComponent},
    ]
  },
  {path : 'signin', component: SigninComponent, title:'sign in'},
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'shop' , component: ShopComponent , title: 'Shop'},
  { path: 'cart' , component: CartComponent , title: 'Cart'},
  { path: 'recipe' , component: RecipeComponent , title: 'Recipe'},
  { path: 'sharerecipe' , component: SharerecipeComponent , title: 'Share Recipe'},
  { path: 'signin' , component:SigninComponent, title:'Sign In'},
  { path: 'signup' , component:SignupComponent, title:'Sign Up'},
  

  { path: '**' , component: NotfoundComponent , title: 'Not Found '}
];
