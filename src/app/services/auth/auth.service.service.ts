import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataServiceService } from '../data/data.service.service';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '../../models/auth/loginResponse.model';
import { TOKEN, USERINFO } from 'src/app/constants';
import { MeResponse } from 'src/app/models/auth/meResponse.model';
import { UrlTree, Router } from '@angular/router';
import { ROLE, USERNAME } from '../../constants';
import { Role } from 'src/app/models/role/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  ENDPOINT = "/auth/"


  constructor(private http: HttpClient, private dataService: DataServiceService, private router: Router) { }

  login(email: String, password: String): Observable<LoginResponse> {
    this.dataService.loadingScreen.next(true)
    return this.http.post<LoginResponse>(`${environment.url}${this.ENDPOINT}`, {
      email,
      password
    }).pipe(map(body => {
      this.dataService.loadingScreen.next(false)
      this.dataService.isLoggedIn.next(true)
      localStorage.setItem(TOKEN, body.access_token)
      return body
    }), catchError((err) => {
      this.dataService.loadingScreen.next(false)
      this.dataService.isLoggedIn.next(false)
      return throwError(() => "Crendenciales invalidas")
    }))
  }

  userInfo(): Observable<MeResponse> {
    const user: MeResponse = JSON.parse(localStorage.getItem(USERINFO))
    localStorage.removeItem(USERINFO)
    return of (user)
  }


  me(): Observable<boolean | UrlTree> {
    this.dataService.loadingScreen.next(true)
    return this.http.get<MeResponse>(`${environment.url}${this.ENDPOINT}me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
      }
    })
      .pipe(map(body => {
        this.dataService.loadingScreen.next(false)
        this.dataService.isLoggedIn.next(true)
        this.dataService.username.next(body.seudonimo)
        localStorage.setItem(ROLE, body.role.name)
        localStorage.setItem(USERNAME, body.seudonimo)
        localStorage.setItem(USERINFO, JSON.stringify(body))
        return true
      }), catchError((err) => {
        this.dataService.loadingScreen.next(false)
        this.dataService.isLoggedIn.next(false)
        this.dataService.username.next(null)
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(ROLE)
        localStorage.removeItem(USERNAME)
        localStorage.removeItem(USERINFO)
        return this.router.navigate(['/'])
      }))
  }

  roles(): Observable<Role[]> {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Role[]>(`${environment.url}${this.ENDPOINT}roles`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
      }
    })
      .pipe(map(body => {
        this.dataService.loadingScreen.next(false)
        return body
      }), catchError((err) => {
        this.dataService.loadingScreen.next(false)
        return throwError(err)
      }))
  }

  logout() {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(ROLE)
    this.dataService.isLoggedIn.next(false)
  }

  hasPermission(permissions: string[]): boolean {
    return permissions.includes(localStorage.getItem(ROLE))
  }

}