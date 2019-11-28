import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'atlas-frontend';
  isActive: boolean;
  active: string;

  constructor() {
    this.isActive = true;
  }

  ngOnInit() {
    if (this.isActive === true) {
      this.active = 'active';
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem('token');
  }
}
