import { CommonModule, NgClass, NgIf } from "@angular/common";
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserData, UserdataService } from "../../../../../core/services/userData.service";
// import { UserData, UserdataService } from "../../../../../core/services/userData.service";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf , CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SigninComponent{
constructor(
  private userdataService : UserdataService
){
  this.initFormControl();
  this.initformGroup();
}

@Output() signIn:EventEmitter<number> = new EventEmitter();
@Output() signClose:EventEmitter<number> = new EventEmitter();
@Output() signSwitch:EventEmitter<number> = new EventEmitter();
@Output() openForget:EventEmitter<number>= new EventEmitter();

  userData! : FormGroup;
  Phone !: FormControl;
  password !: FormControl;

  initFormControl(){
    this.Phone = new FormControl('',[Validators.maxLength(10), Validators.minLength(10),
      Validators.required, Validators.pattern(/^079\d{7}$/)]),
    this.password = new FormControl ('', [Validators.minLength(8), Validators.maxLength(16), Validators.required])
}

  initformGroup(){
    this.userData = new FormGroup ({
      // name : this.name,
      phone : this.Phone,
      password : this.password
    })
  }

  close(){
    this.signClose.emit(0)
  }

  switch(){
    this.signSwitch.emit(2);
  }
  forget(){
    this.openForget.emit(1);
  }

  submit(){
      const user: UserData = {
        name: "",
        phone: this.userData.value.phone,
        email:"",
        password:this.userData.value.password,
      };
    this.userdataService.checkUserData(user)
    this.close()
  }

  login(){
    this.signIn.emit(1);
  }

}

