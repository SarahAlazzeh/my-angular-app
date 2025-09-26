import {Component} from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MainhomeComponent } from './main/main.component';

@Component({
  selector: 'app-home',
  imports:[ NavbarComponent, FooterComponent , MainhomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent{

}
