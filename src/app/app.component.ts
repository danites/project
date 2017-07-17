import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userToken: string;
  userName: string;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    // this.userToken = localStorage['uniqueUser_token'];
    this.userName = localStorage['name'];

  }

  ngOnInit() {
  }

}
