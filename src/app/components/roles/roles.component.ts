import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/role/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[]
  displayedColumns: string[]
  title: string

  constructor(private route: ActivatedRoute) {
    this.title = 'Roles del sistema'
  }

  ngOnInit(): void {
    this.roles = this.route.snapshot.data['response']
    this.displayedColumns = Object.keys(this.roles[0])
  }

}