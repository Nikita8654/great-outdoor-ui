import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterGuard implements CanActivate {

  constructor(private loginService:LoginService){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.loginService.loggedIn()){
        if(sessionStorage.getItem('userRole')=='PRODUCT_MASTER'){
          return true;
        }
      }
      else{
        return false;
      }
  }
  
}
