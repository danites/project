import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { DbService } from '../db.service';
import { AuthService } from '../auth/auth.service';
//import { routing } from '../app.routes';
//import { Routes } from '../AppRoutes';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private infoMsg = { body: "", type: "info" };
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
  uploadImage() {
    this.dbService.uploadImage().subscribe(
      res => {
        this.sendInfoMsg("Image successfully uploaded.", "success");
        window.location.href = 'http://localhost:4200/joblist';
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {

  }


  ngOnInit() {
  }
  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }
}
