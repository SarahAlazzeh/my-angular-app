import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false // Make it impure to detect language changes
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private languageSubscription: Subscription;
  private currentLanguage: string = 'en';

  constructor(private translationService: TranslationService) {
    this.languageSubscription = this.translationService.getCurrentLanguageObservable().subscribe(
      language => {
        this.currentLanguage = language;
      }
    );
  }

  transform(key: string, params?: { [key: string]: string | number }): string {
    return this.translationService.translate(key, params);
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
