import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-notFound',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css']
})

export class NotfoundComponent {

}
