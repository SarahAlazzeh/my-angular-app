import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../../../core/models/feedback.interface';
import { FeedbackService } from '../../../../core/services/feedback.service';
import { UserdataService } from '../../../../core/services/userData.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  imports: [ NgFor , RouterLink ],
  styleUrls: ['./show-feedback.component.css']
})
export class ShowFeedbackComponent implements OnInit {

  feedbackList: Feedback[] = [];

  constructor(
    private feedbackServis: FeedbackService,
    private userdataService: UserdataService
  ) {}

  ngOnInit() {
  this.feedbackServis.getAllFeedback().then(data => {
    this.feedbackList = data;
  });
}

}