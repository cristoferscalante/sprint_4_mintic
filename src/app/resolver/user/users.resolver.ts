import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MeResponse } from 'src/app/models/auth/meResponse.model';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<MeResponse[]> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MeResponse[]> {
    return this.userService.getAll();
  }
}