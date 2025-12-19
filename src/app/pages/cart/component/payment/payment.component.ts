import { NgClass, NgIf } from "@angular/common";
import { Component, Output, EventEmitter, Input, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ FormsModule , NgIf  , NgClass ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent{
  @Output() clicked:EventEmitter<boolean> = new EventEmitter();


  send(){
    this.clicked.emit(false);
  }

  // BOX 1
  specialNotesBox : boolean = true;
  delivaryBox  : boolean = false;
  infoBox  : boolean = false;

  specialNote :string = "";

  continue(){
    this.specialNotesBox = !this.specialNotesBox;
    this.delivaryBox = !this.delivaryBox;
  }

  address : string ="";
  morning : string = "Morning ";
  afternoon : string = "Afternoon";
  evening : string = "Evening";
  slectedTime : string = "";
  checkPolicy : boolean = false ;

  // time : [] =[ this.morning , this.afternoon, this.evening  ];

  submit(){
    this.delivaryBox = !this.delivaryBox;
    this.infoBox = !this.infoBox;
    // send data to email
    this.specialNote
    this.address
    this.delivaryNote
  }

  orderId: number = 1;

  delivaryNote : string = "";
}
