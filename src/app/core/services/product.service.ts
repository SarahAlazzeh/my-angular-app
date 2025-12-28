import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { products } from '../models/product.data';
// import { FirebaseService } from './firebase.service';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';
import { addDoc, collection, Firestore, getFirestore } from 'firebase/firestore';
// import { getFirestore } from '@angular/f'

// const app = initializeApp(environment.firebase);
// const db = getFirestore();

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>(products);
  public products$ = this.productsSubject.asObservable();

  private firestore = inject(Firestore);

  // constructor (
  //   private firebaseService: FirebaseService,
  //   private fireStore : Firestore
  // ) { }

  getAllProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number): Product | undefined {
    return this.productsSubject.value.find(product => product.id === id);
  }

  searchProducts(query: string): Product[] {
    if (!query.trim()) {
      return this.productsSubject.value;
    }

    return this.productsSubject.value.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      (product.name && product.name.toLowerCase().includes(query.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
    );
  }

  addProduct(product: Product) {
  const productRef = collection(this.firestore , 'product');
  return addDoc(productRef, product);
}

  updateProduct(updatedProduct: Product): void {
    const currentProducts = this.productsSubject.value;
    const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      currentProducts[index] = updatedProduct;
      this.productsSubject.next([...currentProducts]);
    }
  }

  deleteProduct(id: number): void {
    const currentProducts = this.productsSubject.value;
    this.productsSubject.next(currentProducts.filter(p => p.id !== id));
  }
}
