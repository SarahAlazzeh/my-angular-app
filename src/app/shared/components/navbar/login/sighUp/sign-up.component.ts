import { Component, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { ValidationFunction } from "../../../../../Validators/validators";
import { UserData, UserdataService } from "../../../../../core/services/userData.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignupComponent{
  constructor(
      private userdataService : UserdataService
  ){
    this.initFormControl();
    this.initformGroup();
  }

  @Output() signUp:EventEmitter<number>= new EventEmitter();
  @Output() signClose:EventEmitter<number>= new EventEmitter();

  userData! : FormGroup;
  name !: FormControl;
  Phone !: FormControl;
  password !: FormControl;
  repassword !: FormControl;

  initFormControl(){
    this.name =new FormControl('',[Validators.required, Validators.minLength(3), ValidationFunction(/[0-9]/)]),
    this.Phone = new FormControl('',[Validators.maxLength(10), Validators.minLength(10), Validators.required]),
    this.password = new FormControl ('', [Validators.minLength(8), Validators.maxLength(16), Validators.required]),
    this.repassword = new FormControl ('', [Validators.required])
  }

  initformGroup(){
    this.userData = new FormGroup ({
      name : this.name,
      phone : this.Phone,
      password : this.password,
      repassword : this.repassword,
    }, this.passwordNotMatch)
  }

  passwordNotMatch(form : AbstractControl) : null | {[key: string]:boolean} {
    const pass = form.get('password')?.value
    const rePass = form.get('rePassword')?.value
    if(rePass !== pass){
      return{passNotMatch : true}
    } else return null
  }

  close(){
  this.signClose.emit(0)
  }

  switch(){
    this.signUp.emit(1);
  }

submit(){
      const user: UserData = {
        name: String(this.userData.value.name),
        phone: this.userData.value.phone,
        email: this.userData.value.email,
        password:this.userData.value.password
      };
    this.userdataService.checkUserData(user)
    this.close()
  }

}
