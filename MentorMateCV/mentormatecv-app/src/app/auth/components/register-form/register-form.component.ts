import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, IFirestoreUser} from '../../auth.service';
import {Router} from '@angular/router';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from "firebase";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  hide = true;
  isLoading = false;


  @Input() registerForm: FormGroup;
  registerError = '';

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _authService: AuthService,
    private _angularFirestore: AngularFirestore,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onSubmitRegisterForm(): void {

    this.isLoading = true;

    this._authService.registerWithEmailAndPassword(this.registerForm.value, (error) => {

      if (error) {
        this.registerError = error;
        this.isLoading = true;
      } else {
        let user = firebase.auth().currentUser
        this._angularFirestore
          .doc<IFirestoreUser>(`Users/${user.uid}`)
          .update({displayName: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`}).then(() => {
          this._angularFirestore
            .doc<IFirestoreUser>(`Users/${user.uid}`)
            .update({photoURL: `https://i.stack.imgur.com/l60Hf.png`}).then(() => {
            this._router.navigate(['/profile']).then(() => {
              this.isLoading = false;
            });
          })
        });
      }
    });
  }

}
