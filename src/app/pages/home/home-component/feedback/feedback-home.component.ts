import { NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SigninComponent } from "../../../../shared/components/navbar/login/signIn/sign-in.component";
import { FeedbackService } from "../../../../core/services/feedback.service";
import { Feedback } from "../../../../core/models/feedback.interface";
import { UserdataService } from "../../../../core/services/userData.service";

@Component({
  selector: "app-feedback",
  standalone: true,
  imports: [ NgIf, FormsModule, SigninComponent ],
  templateUrl: './feedback-home.component.html',
  styleUrl:'./feedback-home.component.css'
})

export class FeedbackComponent {
  @Input() userLogin: boolean = false; 
  @Output() closed = new EventEmitter<void>();

  constructor( private feedbackServics : FeedbackService,
    private userdataService : UserdataService ){}

  name: string ="";
  message: string = '';
  error: string | null = null;
  loading: boolean = false;
  success: boolean = false;
  signIn: boolean = false;


  close() {
    this.closed.emit();
  }

  async submit() {
  if (!this.message.trim()) {
    this.error = 'Please enter your feedback message.';
    return;
  }

  this.error = null;
  this.loading = true;

  const feedbackMsg: Feedback = {
    name: this.name,
    message: this.message,
  };

  try {
    await this.feedbackServics.addFeedbackOnDB(feedbackMsg);
    this.success = true;
    this.message = '';
    this.name = '';
  } catch (error) {
    this.error = 'Failed to send feedback. Please try again.';
    console.error(error);
  } finally {
    this.loading = false;
  }
}

  signInWindow() {
    this.signIn = true;
  }
}
