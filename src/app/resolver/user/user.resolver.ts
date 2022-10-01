import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MeResponse } from 'src/app/models/auth/meResponse.model';
import { AuthServiceService } from 'src/app/services/auth/auth.service.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<MeResponse> {

  constructor(private authService: AuthServiceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MeResponse> {
    return this.authService.userInfo();
  }
}