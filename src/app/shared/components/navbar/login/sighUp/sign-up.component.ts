import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignupComponent{
  constructor(){
    this.initFormControl();
    this.initformGroup();
  }

    userData! : FormGroup;
    name !: FormControl;
    Phone !: FormControl;
    password !: FormControl;
    repassword !: FormControl;

    initFormControl(){
      this.Phone = new FormControl('',[Validators.maxLength(10), Validators.minLength(10), Validators.required]),
      this.password = new FormControl ('', [Validators.minLength(8), Validators.maxLength(16), Validators.required]),
      this.repassword = new FormControl ('', [Validators.minLength(8), Validators.maxLength(16), Validators.required]),
      this.name =new FormControl('',[Validators.required, Validators.minLength(3)])
  }

    initformGroup(){
      this.userData = new FormGroup ({
        name : this.name,
        phone : this.Phone,
        password : this.password,
        repassword : this.repassword,
      })
    }

    submit(){
      if(this.userData.valid){
      }
      if(this.userData.invalid) {this.userData.markAllAsTouched()}
    }
}
