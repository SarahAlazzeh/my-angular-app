import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { products } from '../models/product.data';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public loading$ = this.loadingSubject.asObservable();

  private firestore = inject(Firestore);
  private initialized = false;

  constructor() {
    this.loadProducts();
  }

  private fixImagePath(imagePath: string): string {
    if (!imagePath) return '';
    
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

  async loadProducts(): Promise<void> {
    this.loadingSubject.next(true);
    try {
      const staticProducts = [...products];
      
      const productRef = collection(this.firestore, 'product');
      const snapshot = await getDocs(productRef);
      
      const firestoreProducts: Product[] = [];
      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const imagePath = this.fixImagePath(data['img'] || '');
        firestoreProducts.push({
          id: data['id'] || Date.now(),
          title: data['title'] || '',
          price: data['price'] || 0,
          quantity: data['quantity'] || '',
          img: imagePath,
          name: data['name'],
          description: data['description'],
          firestoreId: docSnapshot.id
        });
      });

      const allProducts = [...staticProducts];
      firestoreProducts.forEach(firestoreProduct => {
        const exists = allProducts.some(p => p.id === firestoreProduct.id);
        if (!exists) {
          allProducts.push(firestoreProduct);
        }
      });

      this.productsSubject.next(allProducts);
      this.initialized = true;
    } catch (error) {
      console.error('Error loading products:', error);
      this.productsSubject.next([...products]);
      this.initialized = true;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  getAllProducts(): Observable<Product[]> {
    if (!this.initialized) {
      this.loadProducts();
    }
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

  async addProduct(product: Product): Promise<void> {
    try {
      const productRef = collection(this.firestore, 'product');
      await addDoc(productRef, product);
      
      const currentProducts = this.productsSubject.value;
      const updatedProducts = [...currentProducts, product];
      this.productsSubject.next(updatedProducts);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  updateProduct(updatedProduct: Product): void {
    const currentProducts = this.productsSubject.value;
    const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      currentProducts[index] = updatedProduct;
      this.productsSubject.next([...currentProducts]);
    }
  }

  async deleteProduct(product: Product): Promise<void> {
    try {
      if (product.firestoreId) {
        const productRef = doc(this.firestore, 'product', product.firestoreId);
        await deleteDoc(productRef);
      }
      
      const currentProducts = this.productsSubject.value;
      this.productsSubject.next(currentProducts.filter(p => p.id !== product.id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}
