import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeResponse } from 'src/app/models/auth/meResponse.model';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {
  userInfo: MeResponse
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userInfo = this.route.snapshot.data['response']
  }

}
