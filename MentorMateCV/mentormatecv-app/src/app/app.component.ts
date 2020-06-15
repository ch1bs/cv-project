import {Component, OnInit} from '@angular/core';
import {AuthService, IFirestoreUser} from './auth/auth.service';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _userSub: Subscription;
  isAuthenticated = false;
  user = this._authService.user$;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._userSub = this._authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logOut(): void {
    this._authService.logOut();
  }

  redirectToLoginPage(): void {
    this._router.navigate(['/login-form']);
  }

  redirectToRegisterPage(): void {
    this._router.navigate(['/register-form']);
  }

  redirectToHomePage(): void {
    this._router.navigate(['/home']);
  }

  redirectToMainInformationPage(): void {
    this._router.navigate(['/main']);
  }

  redirectToProfilePage(): void {
    this._router.navigate(['/profile']);
  }
}
