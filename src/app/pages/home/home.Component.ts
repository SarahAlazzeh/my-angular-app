import {Component} from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MainhomeComponent } from './home-component/main/main.component';
import { AboutComponent } from './home-component/about/about.compnent';
import { FeedbackComponent } from './home-component/feedback/feedback-home.component';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';
import {UserdataService} from '../../core/services/userData.service'
import { emit } from 'process';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, MainhomeComponent, AboutComponent, FeedbackComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent{
  constructor(
    private userdataService : UserdataService,
  ){}

  feedbackOpen : boolean= false;
  
  login: boolean = false;

  feedbackWindow() : boolean{
    this.feedbackOpen = ! this.feedbackOpen;
    this.login = this.userdataService.isLoggedIn();
    return this.login;
  }

}
