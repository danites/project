import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { DbService } from '../db.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private subscription: Subscription;
  id: string;
  image:string;
  userName: string;
  constructor(public auth: AuthService,private activatedRoute: ActivatedRoute, private dbService: DbService) {
    // params will return an Observable
    // we need it so we track changes in parameters as this code will be run once at constructor
    auth.handleAuthentication();
    this.userName = localStorage['name'];
    //this.image=localStorage['image'];
    this.id = localStorage['uniqueUser_token'];
    
  }

  ngOnDestroy() {

  }


  ngOnInit() {
  }

}
