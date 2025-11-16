import { ChangeDetectionStrategy, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface UserData{
  name: string;
  phone: string;
  email:string;
  password: string;
}

@Injectable({
  providedIn:'root'
})

export class UserdataService {

  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  // private phoneNumber  = "0798057662";
  // private password :any = "ShAMM2910";
  public userData$ = this.userDataSubject.asObservable();
  public loggedIn = false;
  public adminLogged = false;
  constructor(){}

  checkUserData(data: UserData) {
    this.userDataSubject.next(data);
    if(data.phone == "0798057662" && data.password == "ShAMm2910" ){
      this.adminLogged= true;}
      else{
        this.loggedIn = true;
      }
  }

  getUserData(): UserData | null {
    return this.userDataSubject.value;
  }

  clearUserData() {
    this.userDataSubject.next(null);
    this.loggedIn = false;
  }

  isLooginAdmin(): boolean{
    return this.adminLogged;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
