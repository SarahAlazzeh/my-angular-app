import { ChangeDetectionStrategy, Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { FirebaseService } from "./firebase.service";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface UserData{
  name: string;
  phone: string;
  email:string;
  password: string;
  photoURL?: string;
  isAdmin?: boolean;
}

@Injectable({
  providedIn:'root'
})

export class UserdataService {
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  private adminSubject = new BehaviorSubject<boolean>(false);
  // isAdmin$ = this.adminSubject.asObservable()

  private currentUserId: string | null = null;

  public loggedIn = false;
  public adminLogged = false;

  constructor(private firebaseService: FirebaseService){
    this.initAuthStateListener();
  }

  private initAuthStateListener(): void {
    const auth = this.firebaseService.getAuth();

    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        this.currentUserId = user.uid;
        this.loggedIn = true;
        // Check if user is admin (you can customize this logic)
        // if (user.email === 'admin@sarahsbakery.com') {
          // this.adminLogged = true;
        // }
        // Load user data from Firestore
        await this.loadUserDataFromFirestore(user.uid);
      } else {
        this.currentUserId = null;
        this.loggedIn = false;
        this.adminLogged = false;
        this.userDataSubject.next(null);
      }
    });
  }

  private async loadUserDataFromFirestore(uid: string): Promise<void> {
    try {
      console.log('auth uid:' , uid);

      const auth = this.firebaseService.getAuth();
      const currentUser = auth.currentUser;

      const db = this.firebaseService.getFirestore();
      const userDoc = await getDoc(doc(db, 'users', uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user: UserData = {
          name: userData['name'] || '',
          phone: userData['phone'] || '',
          email: userData['email'] || '',
          password: '',
          photoURL: userData['photoURL'] || currentUser?.photoURL || undefined ,
          isAdmin: userData['isAdmin'] || false
        };
        this.userDataSubject.next(user);
      console.log('isAdmin from Firestore:', userData['isAdmin']);


        this.adminLogged = user.isAdmin ?? false;
        this.adminCheck.next(this.adminLogged);
        console.log('admin statuse set to:', this.adminLogged);
      } else {
        // If user data doesn't exist in Firestore, create basic user object from auth
        if (currentUser) {
          const user: UserData = {
            name: currentUser.displayName || '',
            phone: '',
            email: currentUser.email || '',
            password: '',
            photoURL: currentUser.photoURL || undefined
          };
          this.userDataSubject.next(user);
        }
      }
    } catch (error) {
      console.error('Error loading user data from Firestore:', error);
    }
  }

  // adminCheck

  private adminCheck = new ReplaySubject<boolean>(1);
  isAdmin$ = this.adminCheck.asObservable();

  setUserData(data: UserData, uid: string): void {
    this.userDataSubject.next(data);
    this.currentUserId = uid;
    this.loggedIn = true;

    // Check if user is admin
    const isAdmin = data.isAdmin || false;
    this.adminLogged = isAdmin;
    this.adminCheck.next(isAdmin);
  }

  // checkUserData(data: UserData) {
  //   Legacy method for backward compatibility
  //   this.userDataSubject.next(data);
  //   if(data.phone == "0798057662" && data.password == "ShAMm2910" ){
  //     this.adminLogged= true;
  //   } else {
  //     this.loggedIn = true;
  //   }
  // }

  getUserData(): UserData | null {
    return this.userDataSubject.value;
  }

  getCurrentUserId(): string | null {
    return this.currentUserId;
  }

  async clearUserData(): Promise<void> {
    const auth = this.firebaseService.getAuth();
    try {
      await signOut(auth);
      this.userDataSubject.next(null);
      this.loggedIn = false;
      this.adminLogged = false;
      this.currentUserId = null;
      this.adminCheck.next(false);
      localStorage.removeItem('isAdmin')
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  isLooginAdmin(): boolean{
    return this.adminLogged;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
