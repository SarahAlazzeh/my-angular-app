import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { APP_CONSTANTS } from '../constants/app.constants';
import { FirebaseService } from './firebase.service';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
  private authUnsubscribe?: Unsubscribe;
  private cartUnsubscribe?: Unsubscribe;
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
    if (this.cartUnsubscribe) {
      this.cartUnsubscribe();
    }
  }

  private initAuthListener(): void {
    const auth = this.firebaseService.getAuth();
    this.authUnsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        this.currentUserId = user.uid;
        await this.loadCartFromFirestore(user.uid);
        this.subscribeToCartChanges(user.uid);
      } else {
        this.currentUserId = null;
        // Load from localStorage when logged out
        const localCart = this.loadCartFromStorage();
        this.cartSubject.next(localCart);
        if (this.cartUnsubscribe) {
          this.cartUnsubscribe();
        }
      }
    });
  }

  private subscribeToCartChanges(uid: string): void {
    const db = this.firebaseService.getFirestore();
    const cartRef = doc(db, 'carts', uid);
    
    if (this.cartUnsubscribe) {
      this.cartUnsubscribe();
    }

    this.cartUnsubscribe = onSnapshot(cartRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const cartItems: CartItem[] = data['items'] || [];
        this.cartSubject.next(cartItems);
      } else {
        // If cart doesn't exist, try to migrate from localStorage
        const localCart = this.loadCartFromStorage();
        if (localCart.length > 0) {
          await this.saveCartToFirestore(uid, localCart);
        } else {
          this.cartSubject.next([]);
        }
      }
    });
  }

  private async loadCartFromFirestore(uid: string): Promise<void> {
    try {
      const db = this.firebaseService.getFirestore();
      const cartDoc = await getDoc(doc(db, 'carts', uid));
      
      if (cartDoc.exists()) {
        const data = cartDoc.data();
        const cartItems: CartItem[] = data['items'] || [];
        this.cartSubject.next(cartItems);
        // Clear localStorage after successful migration
        this.clearLocalStorage();
      } else {
        // Try to migrate from localStorage
        const localCart = this.loadCartFromStorage();
        if (localCart.length > 0) {
          await this.saveCartToFirestore(uid, localCart);
          this.clearLocalStorage();
        } else {
          this.cartSubject.next([]);
        }
      }
    } catch (error) {
      console.error('Error loading cart from Firestore:', error);
      // Fallback to localStorage
      const localCart = this.loadCartFromStorage();
      this.cartSubject.next(localCart);
    }
  }

  private async saveCartToFirestore(uid: string, cart: CartItem[]): Promise<void> {
    try {
      const db = this.firebaseService.getFirestore();
      await setDoc(doc(db, 'carts', uid), {
        items: cart,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving cart to Firestore:', error);
      // Fallback to localStorage
      this.saveCartToStorage(cart);
    }
  }

  private loadCartFromStorage(): CartItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.CART_ITEMS);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  }

  private saveCartToStorage(cart: CartItem[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.CART_ITEMS, JSON.stringify(cart));
    }
  }

  private clearLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.CART_ITEMS);
    }
  }

  async addToCart(product: Product, quantity: number = 1): Promise<void> {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    let updatedCart: CartItem[];
    if (existingItem) {
      existingItem.quantity += quantity;
      updatedCart = [...currentCart];
    } else {
      updatedCart = [...currentCart, { product, quantity }];
    }

    this.cartSubject.next(updatedCart);
    
    if (this.currentUserId) {
      await this.saveCartToFirestore(this.currentUserId, updatedCart);
    } else {
      this.saveCartToStorage(updatedCart);
    }
  }

  async removeFromCart(productId: number): Promise<void> {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    
    this.cartSubject.next(updatedCart);
    
    if (this.currentUserId) {
      await this.saveCartToFirestore(this.currentUserId, updatedCart);
    } else {
      this.saveCartToStorage(updatedCart);
    }
  }

  async updateQuantity(productId: number, quantity: number): Promise<void> {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(item => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        await this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        const updatedCart = [...currentCart];
        this.cartSubject.next(updatedCart);
        
        if (this.currentUserId) {
          await this.saveCartToFirestore(this.currentUserId, updatedCart);
        } else {
          this.saveCartToStorage(updatedCart);
        }
      }
    }
  }

  async clearCart(): Promise<void> {
    this.cartSubject.next([]);
    
    if (this.currentUserId) {
      await this.saveCartToFirestore(this.currentUserId, []);
    } else {
      this.saveCartToStorage([]);
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  getCartItemCount(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartSubject.value.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0);
  }

  getCartItemsValue(): CartItem[] {
    return this.cartSubject.value;
  }
}
