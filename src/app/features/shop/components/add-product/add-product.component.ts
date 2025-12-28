import { Component, inject } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // دوال فقط
import { Storage } from '@angular/fire/storage';                      // الـ service التي تستخدمها inject
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [TranslatePipe, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  private productService = inject(ProductService);
  private storage = inject(Storage);  // هنا نستخدم Storage من @angular/fire/storage

  newImg!: File;
  newTitle = '';
  newPrice = 0;
  newQuantity = '';

  async addProduct() {

    if (!this.newTitle || !this.newPrice || !this.newImg) {
      console.log('Please fill all required fields and select an image.');
      return;
    }

    try {
      const filePath = `products/${Date.now()}_${this.newImg.name}`;
      const storageRef = ref(this.storage, filePath);  // هنا inject(Storage) يعمل بشكل صحيح

      await uploadBytes(storageRef, this.newImg);
      const imageUrl = await getDownloadURL(storageRef);

      await this.productService.addProduct({
        id: 1,
        title: this.newTitle,
        price: this.newPrice,
        quantity: this.newQuantity,
        img: imageUrl
      });

      // reset
      this.newTitle = '';
      this.newPrice = 0;
      this.newQuantity = '';
      this.newImg = undefined as any;

    } catch (err) {
      console.error('Image upload error:', err);
    }
  }

  onFileSelected(event: any) {
    this.newImg = event.target.files[0];
  }
}
