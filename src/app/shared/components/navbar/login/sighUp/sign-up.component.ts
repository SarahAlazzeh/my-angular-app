import { Component, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass, CommonModule } from "@angular/common";
import { ValidationFunction } from "../../../../../Validators/validators";
import { UserData, UserdataService } from "../../../../../core/services/userData.service";
import { FirebaseService } from "../../../../../core/services/firebase.service";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignupComponent{
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
      private userdataService : UserdataService,
      private firebaseService: FirebaseService
  ){
    this.initFormControl();
    this.initformGroup();
  }

  @Output() switch:EventEmitter<number>= new EventEmitter();
  @Output() close:EventEmitter<number>= new EventEmitter();

  userData! : FormGroup;
  name !: FormControl;
  email !: FormControl;
  Phone !: FormControl;
  password !: FormControl;
  repassword !: FormControl;

  showPassword = false;
  showRePassword = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowRePassword() {
    this.showRePassword = !this.showRePassword;
  }

  initFormControl(){
    this.name =new FormControl('',[Validators.required, Validators.minLength(3), ValidationFunction(/[0-9]/)]),
    this.email = new FormControl('', [Validators.required, Validators.email]),
    this.Phone = new FormControl('',[Validators.maxLength(10), Validators.minLength(10), Validators.required]),
    this.password = new FormControl ('', [Validators.minLength(8), Validators.maxLength(16), Validators.required]),
    this.repassword = new FormControl ('', [Validators.required])
  }

  initformGroup(){
    this.userData = new FormGroup ({
      name : this.name,
      email : this.email,
      phone : this.Phone,
      password : this.password,
      repassword : this.repassword,
    }, this.passwordNotMatch)
  }

  passwordNotMatch(form : AbstractControl) : null | {[key: string]:boolean} {
    const pass = form.get('password')?.value
    const rePass = form.get('repassword')?.value
    if(rePass !== pass){
      return{passNotMatch : true}
    } else return null
  }

  onClose(){
    this.close.emit(0)
  }

  onSwitch(){
    this.switch.emit(1);
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
      const name = this.userData.value.name;
      const phone = this.userData.value.phone;

      // Create user with Firebase Auth
      const auth = this.firebaseService.getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const db = this.firebaseService.getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
        isAdmin: false
      });

      const user: UserData = {
        name: name,
        phone: phone,
        email: email,
        password: '',
        isAdmin: false
      };
      this.userdataService.setUserData(user, userCredential.user.uid);

      this.onClose();
    } catch (error: any) {
      console.error('Sign up error:', error);
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async signUpWithGoogle(){
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
        const userData = userDoc.data();
        const user: UserData = {
          name: userData['name'] || userCredential.user.displayName || '',
          phone: userData['phone'] || '',
          email: userData['email'] || userCredential.user.email || '',
          password: '',
          photoURL: userData['photoURL'] || userCredential.user.photoURL || undefined,
          isAdmin: userData['isAdmin'] || false
        };
        this.userdataService.setUserData(user, userCredential.user.uid);
      } else {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: userCredential.user.displayName || '',
          email: userCredential.user.email || '',
          phone: '',
          photoURL: userCredential.user.photoURL || null,
          createdAt: new Date().toISOString(),
          provider: 'google',
          isAdmin: false
        });

        const user: UserData = {
          name: userCredential.user.displayName || '',
          phone: '',
          email: userCredential.user.email || '',
          password: '',
          photoURL: userCredential.user.photoURL || undefined,
          isAdmin: false
        };
        this.userdataService.setUserData(user, userCredential.user.uid);
      }

      this.onClose();
    } catch (error: any) {
      console.error('Google sign up error:', error);
      if (error.code !== 'auth/popup-closed-by-user') {
        this.errorMessage = 'An error occurred during Google sign up. Please try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use a stronger password.';
      default:
        return 'An error occurred during sign up. Please try again.';
    }
  }

}
