import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RetailerUserGuard implements CanActivate {

  constructor(private loginService:LoginService){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if(this.loginService.loggedIn()){
        if(sessionStorage.getItem('userRole')=='RETAILER_USER'){
          return of(true);
        }
      }
      else{
        return of(false);
      }
  }
  
}
