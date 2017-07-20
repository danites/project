import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userToken: string;
  userName: string;

  constructor(public auth: AuthService,private jobService: DbService) {
    auth.handleAuthentication();
    // this.userToken = localStorage['uniqueUser_token'];
    this.userName = localStorage['name'];

  }

  ngOnInit() {
      //We're hard coding default location as Fairfield, Iowa in case Webbrowser didn't enable location which happens often 
      localStorage.setItem('locationLong', '-91.9689413');
      localStorage.setItem('locationLat', '41.016605299999995');
       if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(data => {
          
          localStorage.setItem('locationLong', JSON.stringify(data.coords.longitude));
          localStorage.setItem('locationLat', JSON.stringify(data.coords.latitude));
        });
      }
      //Check and creeate user;

      this.jobService.checkAndCreateUser(localStorage.getItem['name'], localStorage.getItem['uniqueUser_token']);
      // .subscribe(
      //   res => {
      //     console.log('userCreated successfully');
      //   },
      //   error => console.log(error)
      // );    
  }

}
