import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, FormsModule ,ReactiveFormsModule, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SigninComponent{
constructor(){
  this.initFormControl();
  this.initformGroup();
}

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
}
