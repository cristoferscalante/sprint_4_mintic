import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOKEN } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  loadingScreen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  username: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }

}