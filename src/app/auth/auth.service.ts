import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {
  // constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    console.log('auth check token: ',jwtHelper.decodeToken(token));
    
    // Check whether the token is expired and return
    // true or false
    // return !jwtHelper.isTokenExpired(token);
    return token ? true : false;
  }
}