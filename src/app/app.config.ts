import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp  } from 'firebase/app';
import { environment } from '../environments/environment';
import {  getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideFirestore(()=> getFirestore()),
    provideStorage(()=> getStorage())
  ]
};
