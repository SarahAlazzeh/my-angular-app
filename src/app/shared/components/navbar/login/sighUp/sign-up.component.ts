import { Component, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { ValiadtionFunction } from "../../../../../Validators/validators";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignupComponent{
  constructor(){
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
    this.name =new FormControl('',[Validators.required, Validators.minLength(3), ValiadtionFunction(/[0-9]/)]),
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



    // submit(){
    //   if(this.userData.valid){
    //   }
    //   if(this.userData.invalid) {this.userData.markAllAsTouched()}
    // }
}
