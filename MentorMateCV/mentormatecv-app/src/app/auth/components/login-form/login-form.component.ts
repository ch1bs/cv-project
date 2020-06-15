import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  isLoading = false;
  hide = true;
  logInForm: FormGroup;
  loginError = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onSubmitLogInForm(): void {
    this.isLoading = true;
    this._authService.logInWithEmailAndPassword(this.logInForm.value, (error) => {
      if (error) {
        this.isLoading = false;
        this.loginError = error;
      } else {
        this.isLoading = false;
        this._router.navigate(['/profile']);
      }
    });
  }

  logInWithOauth(): void {
    this.isLoading = true;
    this._authService.loginWithOauth('google').then(() => {
      this.isLoading = false;
    });
  }
}
