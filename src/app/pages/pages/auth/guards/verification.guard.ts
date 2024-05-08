import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  constructor(
    public loginService: LoginService,
    public router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const connectedUser = JSON.parse(this.loginService.getUser());
    if (!(connectedUser && connectedUser.isVerificationFullfilled == true)) {
      this.router.navigate(["/register/business-info"]);
    }
    return true;
  }

}
