import { Component, inject, EventEmitter, Output, signal } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [TranslatePipe, FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  isOpen = signal(false);
  @Output() productAdded = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  private productService = inject(ProductService);
  private storage = inject(Storage);

  newImg!: File;
  newTitle = '';
  newPrice = 0;
  newQuantity = '';
  imagePreview = signal<string | null>(null);
  isUploading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  open() {
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen.set(false);
    document.body.style.overflow = '';
    this.resetForm();
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  async addProduct() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (!this.newTitle || !this.newPrice || !this.newImg) {
      this.errorMessage.set('Please fill all required fields and select an image.');
      return;
    }

    this.isUploading.set(true);

    try {
      const filePath = `products/${Date.now()}_${this.newImg.name}`;
      const storageRef = ref(this.storage, filePath);

      await uploadBytes(storageRef, this.newImg);
      const imageUrl = await getDownloadURL(storageRef);

      const newProduct = {
        id: Date.now(),
        title: this.newTitle,
        price: this.newPrice,
        quantity: this.newQuantity,
        img: imageUrl
      };

      await this.productService.addProduct(newProduct);

      this.successMessage.set('Product added successfully!');
      this.productAdded.emit(newProduct);

      // Close modal after a short delay
      setTimeout(() => {
        this.close();
      }, 1500);

    } catch (err) {
      console.error('Image upload error:', err);
      this.errorMessage.set('Failed to upload product. Please try again.');
    } finally {
      this.isUploading.set(false);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (1MB = 1048576 bytes)
      const maxSize = 1048576; // 1MB in bytes
      if (file.size > maxSize) {
        this.errorMessage.set('Image size must be less than 1MB. Please choose a smaller image.');
        this.removeImage();
        return;
      }

      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        this.errorMessage.set('Please select a valid image file.');
        this.removeImage();
        return;
      }

      this.errorMessage.set(null);
      this.newImg = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.newImg = undefined as any;
    this.imagePreview.set(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private resetForm() {
    this.newTitle = '';
    this.newPrice = 0;
    this.newQuantity = '';
    this.newImg = undefined as any;
    this.imagePreview.set(null);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
