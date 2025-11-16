import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserdataService } from '../services/userData.service';

@Injectable({
  providedIn: 'root'
})

export class AdminDataGuard implements CanActivate{
    constructor(private userService: UserdataService, private router: Router) {}

    canActivate(): boolean{
      // return true;
      if (this.userService.adminLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    }
}

// export class AdminDataGuard implements CanActivate {
