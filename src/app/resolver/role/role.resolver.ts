import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth/auth.service.service';
import { Role } from '../../models/role/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleResolver implements Resolve<Role[]> {

  constructor(private authService: AuthServiceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
    return this.authService.roles()
  }
}