import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeResponse } from 'src/app/models/auth/meResponse.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: MeResponse
  @Output() onClick: EventEmitter<MeResponse> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onUserClick() {
    this.onClick.next(this.user)
  }

}