import { ColmenaService } from './../services/colmena.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private colServ: ColmenaService,
    private miRouter: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.colServ.isLogIn) {
      console.log('No tienes acceso');
      this.miRouter.navigate(['login']);
    }
    return this.colServ.isLogIn;
  }

}
