import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserdataService } from '../services/userData.service';
import { FirebaseService } from '../services/firebase.service';
import { firstValueFrom, timeout, catchError, of } from 'rxjs';
import { onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AdminDataGuard implements CanActivate{
    constructor(
      private userService: UserdataService, 
      private router: Router,
      private firebaseService: FirebaseService
    ) {}

    async canActivate(): Promise<boolean> {
      const auth = this.firebaseService.getAuth();
      
      // Wait for auth state to be determined
      return new Promise<boolean>((resolve) => {
        // Check if already authenticated
        if (auth.currentUser) {
          this.checkAdminAndResolve(resolve);
          return;
        }
        
        // Wait for auth state change (with timeout)
        let resolved = false;
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (resolved) return;
          resolved = true;
          unsubscribe();
          
          if (!user) {
            this.router.navigate(['/signin']);
            resolve(false);
            return;
          }
          
          // Wait a bit for userDataService to load user data from Firestore
          await new Promise(r => setTimeout(r, 500));
          await this.checkAdminAndResolve(resolve);
        });
        
        // Timeout after 5 seconds
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            unsubscribe();
            if (!auth.currentUser) {
              this.router.navigate(['/signin']);
              resolve(false);
            } else {
              this.checkAdminAndResolve(resolve);
            }
          }
        }, 5000);
      });
    }
    
    private async checkAdminAndResolve(resolve: (value: boolean) => void): Promise<void> {
      // Check synchronous property first (faster)
      if (this.userService.adminLogged) {
        resolve(true);
        return;
      }
      
      // If not set synchronously, wait for async check (with timeout)
      try {
        const isAdmin = await firstValueFrom(
          this.userService.isAdmin$.pipe(
            timeout(3000), // Wait max 3 seconds
            catchError(() => of(false))
          )
        );
        
        if (isAdmin) {
          resolve(true);
        } else {
          // If logged in but not admin, redirect to home
          this.router.navigate(['/home']);
          resolve(false);
        }
      } catch (error) {
        // If timeout or error, check synchronous property again
        if (this.userService.adminLogged) {
          resolve(true);
        } else {
          this.router.navigate(['/home']);
          resolve(false);
        }
      }
    }
}

// export class AdminDataGuard implements CanActivate {
