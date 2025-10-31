import { Component, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent{
  @Output() clicked:EventEmitter<boolean> = new EventEmitter();

  send(){
    this.clicked.emit(false);
  }

}
