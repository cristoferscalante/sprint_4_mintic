import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth.service.service';
import { DataServiceService } from 'src/app/services/data/data.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean
  username: string

  constructor(public dataService: DataServiceService, private authService: AuthServiceService,
    private router: Router) {
    this.isLoggedIn = false
  }

  ngOnInit(): void {
    this.dataService.isLoggedIn.subscribe(x => {
      this.isLoggedIn = x
    })
    this.dataService.username.subscribe(x => {
      this.username = x
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  roles() {
    this.authService.roles()
    this.router.navigate(['/api/roles/']) // ---> No hace nada, era para probar
  }

}