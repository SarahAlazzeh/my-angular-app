import {Component} from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MainhomeComponent } from './home-component/main/main.component';
import { AboutComponent } from './home-component/about/about.compnent';
import { FeedbackComponent } from './home-component/feedback/feedback-home.component';

@Component({
  selector: 'app-home',
  imports:[ NavbarComponent, FooterComponent , MainhomeComponent, AboutComponent, FeedbackComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent{

}
