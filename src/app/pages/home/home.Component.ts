import {Component} from '@angular/core';
import { NavbarhomeComponent } from './ss/navbar/navbar.component';
import { FooterhomeComponent } from './ss/footer/footer.component';
import { MainhomeComponent } from './main/main.component';

@Component({
  selector: 'app-home',
  imports:[ NavbarhomeComponent, FooterhomeComponent , MainhomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent{

}
