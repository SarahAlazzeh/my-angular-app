import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  private analytics: Analytics | null = null;
  private auth: Auth;
  private firestore: Firestore;
  private storage: FirebaseStorage;

  constructor() {
    // Initialize Firebase with environment configuration
    this.app = initializeApp(environment.firebase);

    // Initialize Analytics (only in browser environment)
    if (typeof window !== 'undefined') {
      this.analytics = getAnalytics(this.app);
    }

    // Initialize Firebase services
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  getApp(): FirebaseApp {
    return this.app;
  }

  getAnalytics(): Analytics | null {
    return this.analytics;
  }

  getAuth(): Auth {
    return this.auth;
  }

  getFirestore(): Firestore {
    return this.firestore;
  }

  getStorage(): FirebaseStorage {
    return this.storage;
  }
}

