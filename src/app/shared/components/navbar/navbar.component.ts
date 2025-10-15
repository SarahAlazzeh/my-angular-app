import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule, NgClass } from "@angular/common";
import { ThemeService } from '../../../core/services/theme.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SigninComponent } from './login/signIn/sign-in.component';
import { LoginswitchComponent } from './login/loginswitch/login-switch.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,
    FormsModule, CommonModule, TranslatePipe,
    NgClass,LoginswitchComponent ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Input() enableSearch: boolean = false;
  @Input() activeRoute: string = '';
  @Output() sendSearchInput: EventEmitter<string> = new EventEmitter();
  @Output() themeChanged: EventEmitter<string> = new EventEmitter();
  @Output() languageChanged: EventEmitter<string> = new EventEmitter();

  inputSearch: string = "";
  currentTheme: string = 'light';
  currentLanguage: string = 'en';
  isActive:boolean= false;

  constructor(
    private themeService: ThemeService,
    private translationService: TranslationService
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

  signin(): void {
    this.isActive = true
  }
}
