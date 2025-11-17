import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.Component';
import { NotfoundComponent } from './pages/notFound/notFound.component';
import { ShopComponent } from './features/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SigninComponent } from './shared/components/navbar/login/signIn/sign-in.component';
import { SignupComponent } from './shared/components/navbar/login/sighUp/sign-up.component';
import { SharerecipeComponent } from './pages/shareRecipe/shareRecipe.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { Component } from '@angular/core';
import { ForgetPasswordComponent } from './shared/components/navbar/login/forget password/forget-password.component';
import { RecipedetailsComponent } from './pages/recipe-details/recipe-details.component';
import { title } from 'process';

export const routes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home' , component: HomeComponent , title: 'Home'},
  { path : 'signin' , component: SigninComponent , title: 'Sign In',},
  { path : 'forget' , component : ForgetPasswordComponent ,title :' Forget Password'} ,
  { path : 'signup', component: SignupComponent , title : 'Sign Up'},
  { path: 'shop' , component: ShopComponent , title: 'Shop'},
  { path: 'cart' , component: CartComponent , title: 'Cart'},
  { path: 'favorites', component:FavoritesComponent, title:'Favorites' },
  { path: 'recipe' , component: RecipeComponent , title: 'Recipe'},
  { path: 'recipe-details/:id' , component: RecipedetailsComponent , title: 'Recipe Details'},
  { path: 'sharerecipe' , component: SharerecipeComponent , title: 'Share Recipe'},
  { path: 'signin' , component:SigninComponent, title:'Sign In'},
  { path: 'signup' , component:SignupComponent, title:'Sign Up'},


  { path: '**' , component: NotfoundComponent , title: 'Not Found '}
];
