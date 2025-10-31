import { NgClass } from "@angular/common";
import { Component, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
// import {  } from "stream";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SigninComponent{
constructor(){
  this.initFormControl();
  this.initformGroup();
}

@Output() signIn:EventEmitter<number> = new EventEmitter();
@Output() signClose:EventEmitter<number> = new EventEmitter();
@Output() signSwitch:EventEmitter<number> = new EventEmitter();
@Output() openForget:EventEmitter<number>= new EventEmitter();


  userData! : FormGroup;
  // name !: FormControl;
  Phone !: FormControl;
  password !: FormControl;

  initFormControl(){
    this.Phone = new FormControl('',[Validators.maxLength(10), Validators.minLength(10), Validators.required]),
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

}

