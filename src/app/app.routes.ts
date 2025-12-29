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
import { FeedbackComponent } from './pages/home/home-component/feedback/feedback-home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShowFeedbackComponent } from './pages/home/home-component/show-feedback/show-feedback.component';
import { AdminDataGuard } from './core/guard/admin.guard';
import { ReviewRecipesComponent } from './pages/review-recipes/review-recipes.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';

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
  { path: 'feedback' , component:FeedbackComponent, title:'Feedback'},
  { path: 'aboutus' , component:AboutComponent, title:'About Us'},
  { path: 'contactus' , component:ContactComponent, title:'Contact Us'},
  { path: 'Showfeedback' , component:ShowFeedbackComponent, title:'Customar Feddback', 
    canActivate: [AdminDataGuard]},
  { path: 'review-recipes' , component: ReviewRecipesComponent, title: 'Review Recipes',
    canActivate: [AdminDataGuard]},
  { path: 'admin-orders' , component: AdminOrdersComponent, title: 'Admin Orders',
    canActivate: [AdminDataGuard]},



  { path: '**' , component: NotfoundComponent , title: 'Not Found '}
];
