import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../../../core/models/feedback.interface';
import { FeedbackService } from '../../../../core/services/feedback.service';
import { UserdataService } from '../../../../core/services/userData.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-show-feedback',
  standalone: true,
  templateUrl: './show-feedback.component.html',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  styleUrls: ['./show-feedback.component.css']
})
export class ShowFeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  isLoading: boolean = true;

  constructor(
    private feedbackServis: FeedbackService,
    private userdataService: UserdataService
  ) {}

  ngOnInit() {
    this.loadFeedback();
  }

  async loadFeedback() {
    try {
      this.isLoading = true;
      const data = await this.feedbackServis.getAllFeedback();
      this.feedbackList = data;
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      this.isLoading = false;
    }
  }
}