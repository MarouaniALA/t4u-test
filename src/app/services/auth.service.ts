import {Injectable, NgZone} from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {IUser} from '../models/IUser';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: IUser; // Save logged in user data

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {
    if (localStorage.getItem('user')) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        // this.afs.collection('users').doc(user.uid);
        this.afs.collection('users').doc(user.uid).valueChanges().subscribe(
          (value: IUser) => {
            this.userData = value;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
          }
        );
      } else {
        localStorage.removeItem('user');
        this.userData = null;
      }
    });
  }


  GoogleAuth(fullName?) {
    return this.authLogin(new auth.GoogleAuthProvider(), fullName);
  }

  authLogin(provider, fullName?) {
    return this.afAuth.signInWithPopup(provider)
      .then(async (result) => {
        await this.setUserData(result.user, fullName);
        this.ngZone.run(() => {
          this.router.navigate(['userVideos']);
        });
      }).catch((error) => {
      });
  }

  setUserData(user, fullName?) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = fullName ? {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      fullName
    } : {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  isAuthenticated() {
    return !!this.userData;
  }
}
