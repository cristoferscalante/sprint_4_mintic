import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './services/data/data.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLoadingScreen: boolean = false;

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.loadingScreen.subscribe (x => {
      this.showLoadingScreen = x
    })
  }


}
