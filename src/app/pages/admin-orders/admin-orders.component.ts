import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { OrderService, Order } from '../../core/services/order.service';
import { TranslationService } from '../../core/services/translation.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NavbarComponent, FooterComponent, TranslatePipe],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private translationService = inject(TranslationService);

  orders = signal<Order[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  selectedOrder = signal<Order | null>(null);
  showOrderDetails = signal(false);

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const confirmedOrders = await this.orderService.getConfirmedOrders();
      this.orders.set(confirmedOrders);
    } catch (error: any) {
      console.error('Error loading orders:', error);
      this.errorMessage.set(this.translationService.translate('adminOrders.loadError'));
    } finally {
      this.isLoading.set(false);
    }
  }

  viewOrderDetails(order: Order): void {
    this.selectedOrder.set(order);
    this.showOrderDetails.set(true);
  }

  closeOrderDetails(): void {
    this.showOrderDetails.set(false);
    this.selectedOrder.set(null);
  }

  async updateOrderStatus(orderId: string, newStatus: Order['status']): Promise<void> {
    if (!orderId) return;

    try {
      await this.orderService.updateOrderStatus(orderId, newStatus);
      
      // Update local state
      this.orders.update(orders => 
        orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updatedAt: new Date() }
            : order
        )
      );

      // If order is completed, remove it from the list
      if (newStatus === 'completed' || newStatus === 'cancelled') {
        this.orders.update(orders => orders.filter(order => order.id !== orderId));
      }

      // Close details if viewing this order
      if (this.selectedOrder()?.id === orderId) {
        this.closeOrderDetails();
      }
    } catch (error: any) {
      console.error('Error updating order status:', error);
      this.errorMessage.set(this.translationService.translate('adminOrders.updateError'));
    }
  }

  getStatusColor(status: Order['status']): string {
    switch (status) {
      case 'confirmed':
        return '#3b82f6'; // blue
      case 'preparing':
        return '#f59e0b'; // amber
      case 'ready':
        return '#10b981'; // green
      default:
        return '#6b7280'; // gray
    }
  }

  getStatusLabel(status: Order['status']): string {
    return this.translationService.translate(`adminOrders.status.${status}`);
  }

  formatDate(date: Timestamp | Date | undefined): string {
    if (!date) return '';
    const d = date instanceof Date ? date : date.toDate();
    return d.toLocaleString();
  }
}

