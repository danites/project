import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  // auth0 = new auth0.WebAuth({
  //   clientID: AUTH_CONFIG.clientID,
  //   domain: AUTH_CONFIG.domain,
  //   responseType: 'token id_token',
  //   audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  //   redirectUri: 'http://localhost:4200/callback',
  //   scope: 'openid profile'
  // });
  auth0 = new auth0.WebAuth({
    clientID: 'Q9fmCS4NZAHC1dqV0lVFGaVQRBhWta4a',
    domain: 'dani-23.auth0.com',
    responseType: 'token id_token',
    audience: 'dani-23.com',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      //console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      //this.setSession(authResult);

      this.setSession(authResult, profile);
    });
  }

  private setSession(authResult,profile): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('name', authResult['idTokenPayload']['name']);
    localStorage.setItem('uniqueUser_token', authResult['idTokenPayload']['sub']);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    // localStorage.setItem('image', authResult['idTokenPayload']['picture']);
    // console.log(authResult['idTokenPayload']['picture'])
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('uniqueUser_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
