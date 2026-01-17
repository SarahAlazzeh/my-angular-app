import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { APP_CONSTANTS } from '../constants/app.constants';
import { FirebaseService } from './firebase.service';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService implements OnDestroy {
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();
  private authUnsubscribe?: Unsubscribe;
  private favoritesUnsubscribe?: Unsubscribe;
  private currentUserId: string | null = null;

  constructor(
    private firebaseService: FirebaseService
  ) {
    this.initAuthListener();
  }

  ngOnDestroy(): void {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
    if (this.favoritesUnsubscribe) {
      this.favoritesUnsubscribe();
    }
  }

  private initAuthListener(): void {
    const auth = this.firebaseService.getAuth();
    this.authUnsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        this.currentUserId = user.uid;
        await this.loadFavoritesFromFirestore(user.uid);
        this.subscribeToFavoritesChanges(user.uid);
      } else {
        this.currentUserId = null;
        // Load from localStorage when logged out
        const localFavorites = this.loadFavoritesFromStorage();
        const fixedFavorites = this.fixProductImagePaths(localFavorites);
        this.favoritesSubject.next(fixedFavorites);
        // Update localStorage with fixed paths if they were changed
        if (JSON.stringify(localFavorites) !== JSON.stringify(fixedFavorites)) {
          this.saveFavoritesToStorage(fixedFavorites);
        }
        if (this.favoritesUnsubscribe) {
          this.favoritesUnsubscribe();
        }
      }
    });
  }

  private subscribeToFavoritesChanges(uid: string): void {
    const db = this.firebaseService.getFirestore();
    const favoritesRef = doc(db, 'favorites', uid);
    
    if (this.favoritesUnsubscribe) {
      this.favoritesUnsubscribe();
    }

    this.favoritesUnsubscribe = onSnapshot(favoritesRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const favorites: Product[] = data['items'] || [];
        const fixedFavorites = this.fixProductImagePaths(favorites);
        this.favoritesSubject.next(fixedFavorites);
        // Update Firestore with fixed paths if they were changed
        if (JSON.stringify(favorites) !== JSON.stringify(fixedFavorites)) {
          await this.saveFavoritesToFirestore(uid, fixedFavorites);
        }
      } else {
        // If favorites don't exist, try to migrate from localStorage
        const localFavorites = this.loadFavoritesFromStorage();
        if (localFavorites.length > 0) {
          const fixedFavorites = this.fixProductImagePaths(localFavorites);
          await this.saveFavoritesToFirestore(uid, fixedFavorites);
        } else {
          this.favoritesSubject.next([]);
        }
      }
    });
  }

  private fixImagePath(imagePath: string): string {
    if (!imagePath) return '';
    
    // Fix incorrect image paths to match actual file names in public/images/recipes
    const pathMappings: { [key: string]: string } = {
      '/images/recipes/blueberry-cookies.jpg': '/images/recipes/berryjpg.jpg',
      '/images/recipes/classic-cookies.jpg': '/images/recipes/cookies.jpg',
      '/images/recipes/cinnamon-cookies.jpg': '/images/recipes/cinnamon-cookiesjpg.jpg',
      '/images/recipes/fluffy-pancakes.jpg': '/images/recipes/pancake.jpg',
      '/images/recipes/chocolate-muffins.jpg': '/images/recipes/muffins.jpg',
      '/images/recipes/chocolate-donut.jpg': '/images/recipes/donut.jpg',
      '/images/recipes/cheesecake.jpg': '/images/recipes/chesscake.jpg'
    };

    return pathMappings[imagePath] || imagePath;
  }

  private fixProductImagePaths(products: Product[]): Product[] {
    return products.map(product => ({
      ...product,
      img: this.fixImagePath(product.img)
    }));
  }

  private async loadFavoritesFromFirestore(uid: string): Promise<void> {
    try {
      const db = this.firebaseService.getFirestore();
      const favoritesDoc = await getDoc(doc(db, 'favorites', uid));
      
      if (favoritesDoc.exists()) {
        const data = favoritesDoc.data();
        const favorites: Product[] = data['items'] || [];
        const fixedFavorites = this.fixProductImagePaths(favorites);
        this.favoritesSubject.next(fixedFavorites);
        // Update Firestore with fixed paths if they were changed
        if (JSON.stringify(favorites) !== JSON.stringify(fixedFavorites)) {
          await this.saveFavoritesToFirestore(uid, fixedFavorites);
        }
        // Clear localStorage after successful migration
        this.clearLocalStorage();
      } else {
        // Try to migrate from localStorage
        const localFavorites = this.loadFavoritesFromStorage();
        if (localFavorites.length > 0) {
          const fixedFavorites = this.fixProductImagePaths(localFavorites);
          await this.saveFavoritesToFirestore(uid, fixedFavorites);
          this.clearLocalStorage();
        } else {
          this.favoritesSubject.next([]);
        }
      }
    } catch (error) {
      console.error('Error loading favorites from Firestore:', error);
      // Fallback to localStorage
      const localFavorites = this.loadFavoritesFromStorage();
      const fixedFavorites = this.fixProductImagePaths(localFavorites);
      this.favoritesSubject.next(fixedFavorites);
    }
  }

  private async saveFavoritesToFirestore(uid: string, favorites: Product[]): Promise<void> {
    try {
      const db = this.firebaseService.getFirestore();
      await setDoc(doc(db, 'favorites', uid), {
        items: favorites,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving favorites to Firestore:', error);
      // Fallback to localStorage
      this.saveFavoritesToStorage(favorites);
    }
  }

  private loadFavoritesFromStorage(): Product[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedFavorites = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.FAVORITES);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    return [];
  }

  private saveFavoritesToStorage(favorites: Product[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  }

  private clearLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.FAVORITES);
    }
  }

  async addToFavorites(product: Product): Promise<void> {
    const currentFavorites = this.favoritesSubject.value;
    const exists = currentFavorites.find(item => item.id === product.id);
    
    if (!exists) {
      const updatedFavorites = [...currentFavorites, product];
      this.favoritesSubject.next(updatedFavorites);
      
      if (this.currentUserId) {
        await this.saveFavoritesToFirestore(this.currentUserId, updatedFavorites);
      } else {
        this.saveFavoritesToStorage(updatedFavorites);
      }
    }
  }

  async removeFromFavorites(productId: number): Promise<void> {
    const currentFavorites = this.favoritesSubject.value;
    const updatedFavorites = currentFavorites.filter(item => item.id !== productId);
    
    this.favoritesSubject.next(updatedFavorites);
    
    if (this.currentUserId) {
      await this.saveFavoritesToFirestore(this.currentUserId, updatedFavorites);
    } else {
      this.saveFavoritesToStorage(updatedFavorites);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.some(item => item.id === productId);
  }

  async toggleFavorite(product: Product): Promise<void> {
    if (this.isFavorite(product.id)) {
      await this.removeFromFavorites(product.id);
    } else {
      await this.addToFavorites(product);
    }
  }

  getFavorites(): Observable<Product[]> {
    return this.favorites$;
  }

  getFavoritesCount(): number {
    return this.favoritesSubject.value.length;
  }
}

