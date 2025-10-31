import { Component, Output ,EventEmitter} from "@angular/core";

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class forgetPasswordComponent{
  @Output() fClose:EventEmitter<number>= new EventEmitter();
  closeForget(){
    this.fClose.emit(1);
  }
}
