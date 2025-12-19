import { NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SigninComponent } from "../../../../shared/components/navbar/login/signIn/sign-in.component";

@Component({
  selector: "app-feedback",
  standalone: true,
  imports: [ NgIf, FormsModule, NgFor, SigninComponent ],
  templateUrl: './feedback-home.component.html',
  styleUrl:'./feedback-home.component.css'
})

export class FeedbackComponent {

  @Input() userLogin: boolean = false; // استقبال القيمة من الأب

  @Output() closed = new EventEmitter<void>();

  rating = 0;
  stars = Array(5).fill(0);

  message: string = '';
  error: string | null = null;
  loading: boolean = false;
  success: boolean = false;
  signIn: boolean = false;

  setRating(r: number) {
    this.rating = r;
  }

  close() {
    this.closed.emit();
  }
  submit() {
    if (!this.message.trim()) {
      this.error = 'Please enter your feedback message.';
      return;
    }

    this.error = null;
    this.loading = true;

    // محاكاة إرسال البيانات (يمكنك تعديلها ليتناسب مع طلبك)
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.message = '';
      this.rating = 0;
    }, 1500);
  }

  signInWindow() {
    this.signIn = true;
  }
}
