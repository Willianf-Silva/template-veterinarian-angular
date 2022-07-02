import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivateChild{

  canActivateChild(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

      console.log(route)
      //TODO: Implementar validação para saber se o usuário tem permissão para acessar a rota filha
      return false;
  }
}
