import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MeResponse } from 'src/app/models/auth/meResponse.model';
import { UserService } from 'src/app/services/user/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: MeResponse[]

  constructor(private route: ActivatedRoute,
    private matDialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['response']
  }

  showUser(user: MeResponse) {
    const ref = this.matDialog.open(SignupComponent, {
      height: '500px',
      width: '600px',
    })
    const instance = ref.componentInstance
    instance.user = user
    ref.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.userService.getAll().subscribe(data => {
          this.users = data
        })
      }
    })
  }

}