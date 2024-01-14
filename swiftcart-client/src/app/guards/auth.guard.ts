import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn;
    let guardStatus = false;
    if(isLoggedIn) {
      guardStatus = true;
    } else {

      this.authService.refreshTokens()
      .then((res: string)=>{
        if(res.includes("success")) {
          guardStatus = true;
        }
      }).catch(error=> guardStatus = false)
    }
    return guardStatus;
  }
  
}
