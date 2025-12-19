import { NgIf } from "@angular/common";
import { Component, Output, EventEmitter } from "@angular/core";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ FormsModule, NgIf ],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  @Output() fClose: EventEmitter<number> = new EventEmitter();

  email = '';
  password = '';
  rePassword = '';

  strength: 'weak' | 'medium' | 'strong' = 'weak';

  isValid = false;
  isLoading = false;

  // عرض/إخفاء كلمات المرور
  showPassword = false;
  showRePassword = false;

  // رسائل
  successMessage = '';
  errorMessage = '';
// حماية من المحاولات المتكررة
  attemptsCount = 0;
  isLocked = false;
  lockTimeLeft = 0;
  lockInterval: any;

  closeForget() {
    this.fClose.emit(1);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowRePassword() {
    this.showRePassword = !this.showRePassword;
  }

  checkEmail() {
    this.clearMessages();
    this.validateForm();
  }

  checkPassword() {
    this.clearMessages();

    const hasNumber = /\d/.test(this.password);
    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasSpecial = /[!@#$%^&*]/.test(this.password);
if (this.password.length < 8) {
      this.strength = 'weak';
      this.isValid = false;
    } else if (hasLetter && hasNumber && hasSpecial) {
      this.strength = 'strong';
    } else {
      this.strength = 'medium';
    }

    this.validateForm();
  }

  checkRePassword() {
    this.clearMessages();
    this.validateForm();
  }

  validateForm() {
    if (
      this.email && this.email.length > 8 &&
      this.password && this.password.length >= 8 &&
      this.rePassword && this.rePassword === this.password &&
      this.strength !== 'weak'
    ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

submit() {
  if (this.isLocked || !this.isValid || this.isLoading) return;

  this.isLoading = true;
  this.clearMessages();

setTimeout(() => {
    this.isLoading = false;

    if (this.password.toLowerCase().includes('fail')) {
      this.errorMessage = 'Failed to reset password. Please try again.';
      this.recordAttempt();
    } else {
      this.successMessage = 'Password changed successfully!';
      this.resetAttempts();
      this.resetForm();
      }
    }, 1500);
  }
  
recordAttempt() {
    this.attemptsCount++;

    if (this.attemptsCount >= 3) {
      this.lockForm();
    }
  }

resetAttempts() {
  this.attemptsCount = 0;
  this.isLocked = false;
  this.lockTimeLeft = 0;
  if (this.lockInterval) {
    clearInterval(this.lockInterval);
    this.lockInterval = null;
  }
}

lockForm() {
  this.isLocked = true;
  this.lockTimeLeft = 30; // 30 ثانية قفل

  this.lockInterval = setInterval(() => {
    this.lockTimeLeft--;
    if (this.lockTimeLeft <= 0) {
      this.resetAttempts();
    }
  }, 1000);
  }
resetForm() {
    this.email = '';
    this.password = '';
    this.rePassword = '';
    this.isValid = false;
    this.strength = 'weak';
    this.showPassword = false;
    this.showRePassword = false;
  }
}