import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private authenticationService:AuthenticationService
  ) { }

  getAsyncToken() {
    this.getNewAccessToken();
    return localStorage.getItem('access_token');
  }

  getNewAccessToken() {
    if(this.authenticationService.isAccessTokenInvalido()){
      this.authenticationService.refreshToken();
    }
  }

}
