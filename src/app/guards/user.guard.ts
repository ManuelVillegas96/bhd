import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor( private UserService: UserService, private NavController: NavController ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = this.UserService.getIsAuth();
    if (!isAuth) {
      this.NavController.navigateRoot('/login', { animated: true });
    }
    return isAuth;
  }

}
