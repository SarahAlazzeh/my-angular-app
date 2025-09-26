import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Translation {
  [key: string]: string | Translation;
}

// Import translations directly
import enTranslations from '../../../assets/i18n/en.json';
import arTranslations from '../../../assets/i18n/ar.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  private translations: { [language: string]: Translation } = {
    'en': enTranslations as Translation,
    'ar': arTranslations as Translation
  };
  
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    this.loadSavedLanguage();
  }

  private loadSavedLanguage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLanguage = localStorage.getItem('sarah-bakery-language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
        this.setLanguage(savedLanguage);
      }
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getCurrentLanguageObservable(): Observable<string> {
    return this.currentLanguage$;
  }

  setLanguage(language: string): void {
    if (language === 'en' || language === 'ar') {
      this.currentLanguageSubject.next(language);
      this.saveLanguagePreference(language);
      this.applyLanguageDirection(language);
    }
  }

  translate(key: string, params?: { [key: string]: string | number }): string {
    const currentLang = this.getCurrentLanguage();
    const translation = this.getNestedTranslation(this.translations[currentLang], key);
    
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${currentLang}`);
      return key; // Return the key if translation is missing
    }

    // Replace parameters in translation
    if (params) {
      return this.replaceParams(translation, params);
    }

    return translation;
  }

  private getNestedTranslation(obj: Translation, key: string): string | null {
    const keys = key.split('.');
    let result: any = obj;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return null;
      }
    }

    return typeof result === 'string' ? result : null;
  }

  private replaceParams(translation: string, params: { [key: string]: string | number }): string {
    return translation.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key]?.toString() || match;
    });
  }

  private saveLanguagePreference(language: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('sarah-bakery-language', language);
    }
  }

  private applyLanguageDirection(language: string): void {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
      html.setAttribute('lang', language);
    }
  }

  // Get all available languages
  getAvailableLanguages(): string[] {
    return Object.keys(this.translations);
  }

  // Check if a translation key exists
  hasTranslation(key: string): boolean {
    const currentLang = this.getCurrentLanguage();
    return this.getNestedTranslation(this.translations[currentLang], key) !== null;
  }
}
