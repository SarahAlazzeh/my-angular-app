import {Component} from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MainhomeComponent } from './home-component/main/main.component';
import { FeedbackComponent } from './home-component/feedback/feedback-home.component';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';
import {UserdataService} from '../../core/services/userData.service'
import { emit } from 'process';
import { AbouthomeComponent } from './home-component/about/about.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, MainhomeComponent, AbouthomeComponent, FeedbackComponent, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent{

  constructor(
    private userdataService : UserdataService,
  ){}

  admin:boolean = false;

    ngOnInit() {
    this.userdataService.isAdmin$.subscribe(isAdminValue => {
      this.admin = isAdminValue;
      console.log('isAdmin from subscription:', isAdminValue);
    });
  }

  feedbackOpen : boolean= false;

  login: boolean = false;

  feedbackWindow(){
    this.feedbackOpen = !this.feedbackOpen;
    console.log('feedback', this.feedbackOpen);
    this.login = this.userdataService.isLoggedIn();
    // return this.login;
  }

  // showFeedbackWindow(){}
}
