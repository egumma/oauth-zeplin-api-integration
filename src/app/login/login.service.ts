import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CLIENT_ID, ACCESS_TOKEN_API, CLIENT_SECRET, REDIRECT_URL, GRANT_TYPE_AUTH_CODE, GRANT_TYPE_REFRESH_TOKEN } from '../shared/generic.model';
import { User } from '../login/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private AUTH_URL = '/auth';
  private SESSION_USER = 'userData';
  user = new BehaviorSubject<User>(null);
  tokenExpirationTime = null;

  constructor(private http: HttpClient, private router: Router){}

  oauthLogin(oauthCode: string, isTokenRefresh: boolean) {
    let refresToken = '';
    if (isTokenRefresh) {        
      const userData = this.loadSessionUser();
      if(userData){
         refresToken = userData._refresh_token;
      } else {
        this.router.navigate([this.AUTH_URL]);
        return;
      }
    }
    const jsonPayload = isTokenRefresh? {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: GRANT_TYPE_REFRESH_TOKEN,
            refresh_token: refresToken } : 
            {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET, 
                redirect_uri: REDIRECT_URL,
                grant_type: GRANT_TYPE_AUTH_CODE,
                code: oauthCode 
            }
    return this.http.post<any>(ACCESS_TOKEN_API, jsonPayload, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .pipe(catchError(this.handleError),
        tap(resData => this.handleAuthentication(
            resData['access_token'],
            resData['expires_in'],
            resData['refresh_token'],
            resData['refresh_expires_in'],
            resData['token_type'])
        )
    );
  }

  logout(){
      this.user.next(null);
      this.router.navigate([this.AUTH_URL]);
      localStorage.removeItem(this.SESSION_USER);
      if(this.tokenExpirationTime){
          clearTimeout(this.tokenExpirationTime);
      }
      this.tokenExpirationTime = null;
  }

  autoLogin() {
      const userData = this.loadSessionUser();
      if(!userData){
          console.log('-----> user NOT FOUND to autologin');
          this.router.navigate([this.AUTH_URL]);
          return;
      }
      const loadedUser = new User(userData._token_type,
        userData._token, 
        new Date(userData._refresh_tokenExpirationDate),
        userData._refresh_token,
        new Date(userData._refresh_tokenExpirationDate))
      if(loadedUser.token){
          console.log('-----> user FOUND so autologin');
          this.user.next(loadedUser);
          const expireDuration = new Date(userData._tokenExpirationDate).getTime() - 
                                 new Date().getTime();
          this.autoLogout(expireDuration); 
      }
  }

  autoLogout(tokenExpirationTime: number){

      this.tokenExpirationTime = setTimeout(() => {
          this.logout();
      }, tokenExpirationTime);
  }

  private loadSessionUser(): any {
    const userData: {
        _token_type: string;
       _token: string;
       _tokenExpirationDate: Date;
       _refresh_token: string;
       _refresh_tokenExpirationDate: Date;
     } = JSON.parse(localStorage.getItem(this.SESSION_USER));
     return userData;
  }

  private handleAuthentication(
      access_token: string, 
      expires_in: number,
      refresh_token: string,
      refresh_expires_in: number,
      token_type: string
      ){
          const expirationDate = new Date(new Date().getTime() + expires_in * 1000);
          const refreshExpirationDate = new Date(new Date().getTime() + refresh_expires_in * 1000);            
          const user = new User(token_type, access_token, expirationDate, refresh_token, refreshExpirationDate);
          this.user.next(user);
          this.autoLogout(expires_in * 1000);
          localStorage.setItem(this.SESSION_USER, JSON.stringify(user));
          console.log('---Stored userdata to session storage: ', user);
  }

  private handleError(errorResp: HttpErrorResponse) {
      let errorMessage = "An unknown error message";
      if(!errorResp.error || !errorResp.error.error){
          return throwError(errorMessage);
      }
      switch(errorResp.error.error.message){
          case 'OPERATION_NOT_ALLOWED':
                  errorMessage = "Password sign-in is disabled for this project.";
                  break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                  errorMessage = " We have blocked all requests from this device due to unusual activity. Try again later.";
                  break;
          case 'INVALID_PASSWORD':
                  errorMessage = "The password is invalid or the user does not have a password.Password sign-in is disabled for this project.";
                  break;
          case 'USER_DISABLED':
                  errorMessage = "The user account has been disabled by an administrator.";
      }            
      return throwError(errorMessage);
  }
}
