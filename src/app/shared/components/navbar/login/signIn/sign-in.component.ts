import { CommonModule, NgClass } from "@angular/common";
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserData, UserdataService } from "../../../../../core/services/userData.service";
import { FirebaseService } from "../../../../../core/services/firebase.service";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SigninComponent{
  errorMessage: string = '';
  isLoading: boolean = false;

constructor(
  private userdataService : UserdataService,
  private firebaseService: FirebaseService
){
  this.initFormControl();
  this.initformGroup();
  this.checkAuthState();
}

private async checkAuthState(): Promise<void> {
  const auth = this.firebaseService.getAuth();
  if (auth.currentUser) {
    // User is already signed in, load their data
    const db = this.firebaseService.getFirestore();
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const user: UserData = {
        name: userData['name'] || '',
        phone: userData['phone'] || '',
        email: userData['email'] || auth.currentUser.email || '',
        password: ''
      };
      this.userdataService.setUserData(user, auth.currentUser.uid);
    }
  }
}

@Output() signIn:EventEmitter<number> = new EventEmitter();
@Output() signClose:EventEmitter<number> = new EventEmitter();
@Output() signSwitch:EventEmitter<number> = new EventEmitter();
@Output() openForget:EventEmitter<number>= new EventEmitter();

  userData! : FormGroup;
  email !: FormControl;
  password !: FormControl;

  initFormControl(){
    this.email = new FormControl('', [Validators.required, Validators.email]),
    this.password = new FormControl ('', [Validators.minLength(8), Validators.maxLength(16), Validators.required])
  }

  initformGroup(){
    this.userData = new FormGroup ({
      email : this.email,
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

  async submit(){
    if (!this.userData.valid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const email = this.userData.value.email;
      const password = this.userData.value.password;

      // Sign in with Firebase Auth
      const auth = this.firebaseService.getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get user data from Firestore
      const db = this.firebaseService.getFirestore();
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user: UserData = {
          name: userData['name'] || '',
          phone: userData['phone'] || '',
          email: userData['email'] || email,
          password: '', // Don't store password
          photoURL: userData['photoURL'] || userCredential.user.photoURL || undefined
        };
        this.userdataService.setUserData(user, userCredential.user.uid);
      } else {
        // If user data doesn't exist in Firestore, create basic user object
        const user: UserData = {
          name: userCredential.user.displayName || '',
          phone: '',
          email: email,
          password: '',
          photoURL: userCredential.user.photoURL || undefined
        };
        this.userdataService.setUserData(user, userCredential.user.uid);
      }

      this.login();
      this.close();
    } catch (error: any) {
      console.error('Sign in error:', error);
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithGoogle(){
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const auth = this.firebaseService.getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // Check if user data exists in Firestore
      const db = this.firebaseService.getFirestore();
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (userDoc.exists()) {
        // User exists, load their data
        const userData = userDoc.data();
        const user: UserData = {
          name: userData['name'] || userCredential.user.displayName || '',
          phone: userData['phone'] || '',
          email: userData['email'] || userCredential.user.email || '',
          password: '',
          photoURL: userData['photoURL'] || userCredential.user.photoURL || undefined
        };
        this.userdataService.setUserData(user, userCredential.user.uid);
      } else {
        // New user, create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: userCredential.user.displayName || '',
          email: userCredential.user.email || '',
          phone: '',
          photoURL: userCredential.user.photoURL || null,
          createdAt: new Date().toISOString(),
          provider: 'google'
        });

        const user: UserData = {
          name: userCredential.user.displayName || '',
          phone: '',
          email: userCredential.user.email || '',
          password: '',
          photoURL: userCredential.user.photoURL || undefined
        };
        this.userdataService.setUserData(user, userCredential.user.uid);
      }

      this.login();
      this.close();
    } catch (error: any) {
      console.error('Google sign in error:', error);
      if (error.code !== 'auth/popup-closed-by-user') {
        this.errorMessage = 'An error occurred during Google sign in. Please try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  login(){
    this.signIn.emit(1);
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred during sign in. Please try again.';
    }
  }

}

