import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private firestore: AngularFirestore,private http: HttpClient, private router: Router) {}

  signup(
    email: string,
    password: string,
    role: 'teacher' | 'student',
    displayName?: string,
    phoneNumber?: string,
    address?: { street?: string; city?: string; postalCode?: string },
    dateOfBirth?: string
  ) {
    let signupData: any = {
      email: email,
      password: password,
      role: role,
      returnSecureToken: true,
    };
    if (displayName) signupData.displayName = displayName;
    if (phoneNumber) signupData.phoneNumber = phoneNumber;
    if (address) signupData.address = address;
    if (dateOfBirth) signupData.dateOfBirth = dateOfBirth;

    const currentUser = this.user.value;
    if (currentUser && currentUser.role === 'student') {
      signupData.role = 'teacher';
    }

    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
          environment.firebaseAPIKey,
        signupData
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleSignupAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
            role,
            displayName,
            phoneNumber,
            address,
            dateOfBirth
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleLoginAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    if (typeof localStorage !== 'undefined') {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        return;
      }

      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(userDataString);

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
    console.log('Attempting auto login...');
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    console.log('User logged out.');
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  handleSignupAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    role: 'teacher' | 'student',
    displayName?: string,
    phoneNumber?: string,
    address?: { street?: string; city?: string; postalCode?: string },
    dateOfBirth?: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      userId,
      email,
      token,
      expirationDate,
      displayName,
      role,
      undefined,
      phoneNumber,
      dateOfBirth,
      address,
      new Date()
    );
  
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log('User authenticated (signup):', user);
  
    const phoneNumberData = phoneNumber || null;
    const addressData = address ? {
      street: address.street || null,
      city: address.city || null,
      postalCode: address.postalCode || null
    } : null;
    const dateOfBirthData = dateOfBirth || null;
  
    this.firestore.collection('users').doc(userId).set({
      email: email,
      displayName: displayName,
      phoneNumber: phoneNumberData,
      role: role,
      address: addressData,
      dateOfBirth: dateOfBirthData,
    })
    .then(() => {
      console.log('User added to Firestore:', userId);
    })
    .catch(error => {
      console.error('Error adding user to Firestore:', error);
    });
  }

  handleLoginAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    displayName?: string,
    phoneNumber?: string,
    address?: { street?: string; city?: string; postalCode?: string },
    dateOfBirth?: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      userId,
      email,
      token,
      expirationDate,
      displayName,
      undefined, // Nie przekazujemy roli podczas logowania
      undefined,
      phoneNumber,
      dateOfBirth,
      address,
      new Date()
    );
  
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log('User authenticated (login):', user);
  }
   

  private handleError(errorRes: HttpErrorResponse) {
    console.error('Error response:', errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (errorRes) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid email or password.';
          break;
        default:
          errorMessage = 'An unknown error occurred!';
          break;
      }
    }
    return throwError(errorMessage);
  }
}
