import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

export interface IFirestoreUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IFirestoreUser>;

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore,
    private _router: Router,
  ) {
    this.user$ = this._angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.getUserByUid(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  loginWithOauth(providerName: string): Promise<void> {
    return this._angularFireAuth.setPersistence('session').then(() => {
      return this._angularFireAuth
        .signInWithPopup(
          this.getProvider(providerName)
        ).then(response => {
          console.log(response.user);
          this.updateUserInfo(response.user);
          this._router.navigate(['/profile']);
        });
    });
  }

  getProvider(providerName: string): auth.AuthProvider {
    switch (providerName) {
      case 'google':
        return new auth.GoogleAuthProvider();
    }
  }

  logOut(): Promise<void> {
    this._router.navigate(['/login-form']);
    return this._angularFireAuth.signOut();
  }

  logInWithEmailAndPassword(credentials: { email: string, password: string }, callback: (error?: any) => void): Promise<void> {
    return this._angularFireAuth.setPersistence('session').then(() => {
      return this
        ._angularFireAuth
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => {
          this.updateUserInfo(response.user);
          console.log(response);
          callback();
        })
        .catch(error => {
          callback(error);
        });
    });
  }

  registerWithEmailAndPassword(credentials: { email: string, password: string }, callback: (error?: any) => void): Promise<void> {
    return this._angularFireAuth.setPersistence('session').then(() => {
      return this
        ._angularFireAuth
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => {
          this.updateUserInfo(response.user);
          callback();
        })
        .catch(error => {
          callback(error);
        });
    });
  }

  private getUserByUid(uid: string): Observable<IFirestoreUser> {
    return this
      ._angularFirestore
      .doc<IFirestoreUser>(`/Users/${uid}`).valueChanges();
  }

  private updateUserInfo({uid, displayName, email, photoURL}: firebase.User): Promise<void> {
    return this
      ._angularFirestore
      .doc<IFirestoreUser>(`Users/${uid}`)
      .set({uid, displayName, email, photoURL}, {merge: true})
  }
}
