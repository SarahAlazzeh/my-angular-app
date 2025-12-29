import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { CartItem } from './cart.service';

export interface Order {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  items: CartItem[];
  totalPrice: number;
  deliveryPrice: number;
  address: string;
  deliveryTime: string;
  specialNote?: string;
  deliveryNote?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
  confirmedAt?: Timestamp | Date;
  preparedAt?: Timestamp | Date;
  completedAt?: Timestamp | Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore = inject(Firestore);

  // Create a new order
  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<string> {
    // Filter out undefined values (Firestore doesn't accept undefined)
    const cleanOrder: any = {
      userId: order.userId,
      userName: order.userName,
      userEmail: order.userEmail,
      items: order.items,
      totalPrice: order.totalPrice,
      deliveryPrice: order.deliveryPrice,
      address: order.address,
      deliveryTime: order.deliveryTime,
      status: 'confirmed',
      createdAt: Timestamp.now(),
      confirmedAt: Timestamp.now()
    };

    // Only include optional fields if they exist and are not undefined
    if (order.userPhone !== undefined && order.userPhone !== null && order.userPhone !== '') {
      cleanOrder.userPhone = order.userPhone;
    }
    if (order.specialNote !== undefined && order.specialNote !== null && order.specialNote !== '') {
      cleanOrder.specialNote = order.specialNote;
    }
    if (order.deliveryNote !== undefined && order.deliveryNote !== null && order.deliveryNote !== '') {
      cleanOrder.deliveryNote = order.deliveryNote;
    }

    const ordersRef = collection(this.firestore, 'orders');
    const docRef = await addDoc(ordersRef, cleanOrder);
    return docRef.id;
  }

  // Get all orders (admin only)
  async getAllOrders(): Promise<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Order, 'id'>
    }));
  }

  // Get confirmed orders (admin only)
  async getConfirmedOrders(): Promise<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(
      ordersRef,
      where('status', 'in', ['confirmed', 'preparing', 'ready']),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Order, 'id'>
    }));
  }

  // Get orders by user ID
  async getUserOrders(userId: string): Promise<Order[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Order, 'id'>
    }));
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const orderRef = doc(this.firestore, 'orders', orderId);
    const updateData: any = {
      status,
      updatedAt: Timestamp.now()
    };

    // Add timestamp based on status
    if (status === 'confirmed') {
      updateData.confirmedAt = Timestamp.now();
    } else if (status === 'preparing') {
      updateData.preparedAt = Timestamp.now();
    } else if (status === 'completed') {
      updateData.completedAt = Timestamp.now();
    }

    await updateDoc(orderRef, updateData);
  }

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    const orderRef = doc(this.firestore, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);
    
    if (orderDoc.exists()) {
      return {
        id: orderDoc.id,
        ...orderDoc.data() as Omit<Order, 'id'>
      };
    }
    return null;
  }
}

