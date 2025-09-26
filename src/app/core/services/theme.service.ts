import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(this.getInitialTheme());
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
  }

  private getInitialTheme(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.THEME);
      return savedTheme || APP_CONSTANTS.THEMES.LIGHT;
    }
    return APP_CONSTANTS.THEMES.LIGHT;
  }

  private applyTheme(theme: string): void {
    if (typeof document !== 'undefined') {
      const body = document.body;
      body.classList.remove('light-theme', 'dark-theme');
      body.classList.add(`${theme}-theme`);
    }
  }

  private saveTheme(theme: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.THEME, theme);
    }
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme = currentTheme === APP_CONSTANTS.THEMES.LIGHT 
      ? APP_CONSTANTS.THEMES.DARK 
      : APP_CONSTANTS.THEMES.LIGHT;
    this.setTheme(newTheme);
  }

  getCurrentTheme(): Observable<string> {
    return this.theme$;
  }
}
