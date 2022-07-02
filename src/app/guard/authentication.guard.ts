import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security/authentication.service';
import { AlertModalService } from '../shared/alert-modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad{

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private alertService: AlertModalService
    ) { }
  
    canActivate(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot
      ): Observable<boolean> | boolean {
        return this.verifyAccess();
    }

    canLoad(route: Route): Observable<boolean> | boolean {
      return this.verifyAccess();
  }
  
  private verifyAccess(){
    if(this.authenticationService.isUserLoggedIn()){
      return true;
    }

    this.authenticationService.encerrarSessao();
    this.alertService.showAlertDanger("Sessão expirada. Favor refazer o login.");
    return false;
  }
}