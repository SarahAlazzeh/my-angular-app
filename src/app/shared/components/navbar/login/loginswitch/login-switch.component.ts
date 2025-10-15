import { Component } from '@angular/core';
import { SigninComponent } from '../signIn/sign-in.component';
import { SignupComponent } from '../sighUp/sign-up.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-loginswitch',
  standalone: true,
  imports: [SigninComponent, SignupComponent, ],
  templateUrl: './login-switch.component.html',
  styleUrls: ['./login-switch.component.css']
})
export class LoginswitchComponent {

}
