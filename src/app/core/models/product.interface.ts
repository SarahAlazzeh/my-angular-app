export interface Product {
  id: number;
  img: string;
  title: string;
  price: number;
  quantity: string;
  name?: string;
  description?: string;
  firestoreId?: string; // Firestore document ID for products from Firestore
}
