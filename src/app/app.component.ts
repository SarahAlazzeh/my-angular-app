
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './core/services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class App implements OnInit {
  protected readonly title = signal('sarah-bakery');

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    // Firebase is initialized in the service constructor
    // This ensures Firebase is ready when the app starts
    console.log('Firebase initialized:', this.firebaseService.getApp().name);
  }
}
