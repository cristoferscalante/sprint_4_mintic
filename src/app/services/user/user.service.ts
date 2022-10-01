import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TOKEN } from 'src/app/constants';
import { MeResponse } from 'src/app/models/auth/meResponse.model';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../data/data.service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ENDPOINT = "usuarios/"

  constructor(private http: HttpClient, private dataService: DataServiceService) { }

  getAll(): Observable<MeResponse[]> {
    this.dataService.loadingScreen.next(true)
    return this.http.get<MeResponse[]>(`${environment.url}${this.ENDPOINT}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
      }
    })
      .pipe(map( response => {
        this.dataService.loadingScreen.next(false)
        return response
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError(err)
      }))
  }

  create(data: {email: string, password: string, name: string, lastName: string}): Observable<string> {
    this.dataService.loadingScreen.next(true)
    return this.http.post(`${environment.url}${this.ENDPOINT}`, data, {
    }).pipe(map(response => {
      this.dataService.loadingScreen.next(false)
      return "Registro exitoso"
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return throwError(JSON.stringify(err))
    }))
  }

  update(id:string, data: {name: string, lastName: string}): Observable<string> {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${id}`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
      }
    }).pipe(map(response => {
      this.dataService.loadingScreen.next(false)
      return "Acutalización exitoso"
    }), catchError(err => {
      this.dataService.loadingScreen.next(false)
      return throwError(JSON.stringify(err))
    }))
  }

}