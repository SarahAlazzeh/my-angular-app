import { Component, Output, EventEmitter, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ThemeService } from '../../../core/services/theme.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SigninComponent } from './login/signIn/sign-in.component';
// import { LoginswitchComponent } from './login/loginswitch/login-switch.component';
import { SignupComponent } from "./login/sighUp/sign-up.component";
import { ForgetPasswordComponent } from './login/forget password/forget-password.component';
import { UserdataService } from '../../../core/services/userData.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SignupComponent ,
    FormsModule, CommonModule, TranslatePipe, SigninComponent
  , ForgetPasswordComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Input() enableSearch: boolean = false;
  @Input() activeRoute: string = '';
  @Output() sendSearchInput: EventEmitter<string> = new EventEmitter();
  @Output() themeChanged: EventEmitter<string> = new EventEmitter();
  @Output() languageChanged: EventEmitter<string> = new EventEmitter();
  @ViewChild('loader') loader!:ElementRef;
  @ViewChild('check') check!: ElementRef;
  // @ViewChild('signIn') SignIn!: ElementRef;
  // @ViewChild('signUp') signUp!: ElementRef;
  // @ViewChild('Forget') Forget!: ElementRef;


  inputSearch: string = "";
  currentTheme: string = 'light';
  currentLanguage: string = 'en';
  // isInActive: boolean = false;
  // isActive:number = 0;

  constructor(
    private themeService: ThemeService,
    private translationService: TranslationService,
    private userdataService : UserdataService
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.getCurrentTheme().subscribe(theme => {
      this.currentTheme = theme;
    });

    // Subscribe to language changes
    this.translationService.getCurrentLanguageObservable().subscribe(language => {
      this.currentLanguage = language;
    });

    this.userdataService.getUserData()
  }

  onSearchKeyPress(): void {
    if (this.enableSearch) {
      this.sendSearchInput.emit(this.inputSearch);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.themeChanged.emit(this.currentTheme);
  }

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.translationService.setLanguage(newLanguage);
    this.languageChanged.emit(newLanguage);
  }

  activeForm: 'signin' | 'signup' | 'forget' | 'success' | null = null;

signin() { this.activeForm = 'signin'; }
signup() { this.activeForm = 'signup'; }
forget() { this.activeForm = 'forget'; }
success() { 
  this.activeForm = 'success' 
  this.loader.nativeElement.style.display= 'flex';
    setTimeout(() => {
    this.loader.nativeElement.style.display='none';
    }, 2000);

  this.check.nativeElement.style.display='flex';
  setTimeout(()=>{
    this.check.nativeElement.style.display='none';
  }, 2000);

}
signClose() { this.activeForm = null; }

//   signin(): void {
//     this.SignIn.nativeElement.style.display='flex';
//     // this.SignIn.nativeElement.style.display = 'flex';
//     this.signUp.nativeElement.style.display= 'none';
//     this.Forget.nativeElement.style.display= 'none';

//   }

//   signup(){
//   this.SignIn.nativeElement.style.display = 'none';
//   this.signUp.nativeElement.style.display= 'flex';
//   this.Forget.nativeElement.style.display= 'none';
//   console.log('Signin button clicked');

// }

//   forget(){
//   this.SignIn.nativeElement.style.display = 'none';
//   this.signUp.nativeElement.style.display= 'none';
//   this.Forget.nativeElement.style.display= 'flex';  }

//   signClose(){
//   this.SignIn.nativeElement.style.display = 'none';
//   this.signUp.nativeElement.style.display= 'none';
//   this.Forget.nativeElement.style.display= 'none';
//   }

}
