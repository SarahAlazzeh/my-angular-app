import { NgClass, CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, Input, SimpleChanges, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../../../core/services/order.service";
import { CartService, CartItem } from "../../../../core/services/cart.service";
import { UserdataService } from "../../../../core/services/userData.service";
import { FirebaseService } from "../../../../core/services/firebase.service";
import { TranslationService } from "../../../../core/services/translation.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ FormsModule , CommonModule  , NgClass ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent{
  @Output() clicked:EventEmitter<boolean> = new EventEmitter();
  @Input() deliveryPrice: number = 0;
  @Input() totalPrice: number = 0;

  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private userDataService = inject(UserdataService);
  private firebaseService = inject(FirebaseService);
  private translationService = inject(TranslationService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  send(){
    this.clicked.emit(false);
  }

  // BOX 1
  specialNotesBox : boolean = true;
  delivaryBox  : boolean = false;
  infoBox  : boolean = false;

  specialNote :string = "";

  continue(){
    this.specialNotesBox = !this.specialNotesBox;
    this.delivaryBox = !this.delivaryBox;
  }

  address : string ="";
  morning : string = "Morning ";
  afternoon : string = "Afternoon";
  evening : string = "Evening";
  slectedTime : string = "";
  checkPolicy : boolean = false ;

  // time : [] =[ this.morning , this.afternoon, this.evening  ];

  orderId: string = '';
  createdOrderId = signal<string | null>(null);

  delivaryNote : string = "";

  async submit(){
    if (!this.address || !this.slectedTime || !this.checkPolicy) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      // Get current user
      const auth = this.firebaseService.getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        this.errorMessage.set('Please sign in to place an order.');
        this.isLoading.set(false);
        return;
      }

      // Get user data
      const userData = this.userDataService.getUserData();
      if (!userData) {
        this.errorMessage.set('User data not found. Please try again.');
        this.isLoading.set(false);
        return;
      }

      // Get cart items
      const cartItems = this.cartService.getCartItemsValue();
      if (!cartItems || cartItems.length === 0) {
        this.errorMessage.set('Your cart is empty.');
        this.isLoading.set(false);
        return;
      }

      // Format delivery time
      let deliveryTimeText = '';
      switch(this.slectedTime) {
        case 'morning':
          deliveryTimeText = 'Morning (10AM - 12PM)';
          break;
        case 'afternoon':
          deliveryTimeText = 'Afternoon (12PM - 4PM)';
          break;
        case 'evening':
          deliveryTimeText = 'Evening (4PM - 6PM)';
          break;
        default:
          deliveryTimeText = this.slectedTime;
      }

      // Prepare order data (only include fields with values)
      const orderData: any = {
        userId: currentUser.uid,
        userName: userData.name || currentUser.displayName || 'Customer',
        userEmail: userData.email || currentUser.email || '',
        items: cartItems,
        totalPrice: this.totalPrice - this.deliveryPrice,
        deliveryPrice: this.deliveryPrice,
        address: this.address,
        deliveryTime: deliveryTimeText
      };

      // Debug: Verify userId matches auth.uid
      console.log('Creating order with userId:', orderData.userId);
      console.log('Current user UID:', currentUser.uid);
      console.log('Auth state:', currentUser);

      // Only add optional fields if they have values
      if (userData.phone && userData.phone.trim()) {
        orderData.userPhone = userData.phone;
      }
      if (this.specialNote && this.specialNote.trim()) {
        orderData.specialNote = this.specialNote;
      }
      if (this.delivaryNote && this.delivaryNote.trim()) {
        orderData.deliveryNote = this.delivaryNote;
      }

      // Create order
      const orderId = await this.orderService.createOrder(orderData);

      this.orderId = orderId;
      this.createdOrderId.set(orderId);

      // Clear cart after successful order
      await this.cartService.clearCart();

      // Show success message
      this.delivaryBox = false;
      this.infoBox = true;
    } catch (error: any) {
      console.error('Error creating order:', error);
      this.errorMessage.set(this.translationService.translate('cart.orderError') || 'Failed to create order. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
