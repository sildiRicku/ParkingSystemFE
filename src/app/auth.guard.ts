import { CanActivateFn, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { AuthServiceService} from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private authService:AuthServiceService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return this.router.navigate(['/']);

    }
  }
};
