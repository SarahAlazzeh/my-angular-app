import { Injectable } from "@angular/core";

export interface Sign{
  name: string;
  phone: number;
  email:string;
  password: any;
}

@Injectable({
  providedIn:'root'
})

export class SignService {}
