import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AlertService, AuthenticationService} from '../_services';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasAdminRole = this.authenticationService.hasAdminRole();

    if (hasAdminRole) {
      return true;
    }

    this.alertService.openSnackBar('The current user does not have the rights to open the Admin Panel', true);
    return false;
  }
}
