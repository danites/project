import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { DbService } from '../db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
// Read Route parameters from ActivateRoute
  // We will use Observable as wrapper to subscribe to param changes
  private subscription: Subscription;
  id: string;
  onetimeId: string;

  constructor(private activatedRoute: ActivatedRoute, private dbService: DbService) {
    // params will return an Observable
    // we need it so we track changes in parameters as this code will be run once at constructor
    this.subscription = activatedRoute.params.subscribe(
        (param: any) => {
          this.id = param['id'];
          //this.dbService.
        }
    );
    // constructor will be used once
    this.onetimeId = activatedRoute.snapshot.params['id']
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  ngOnInit() {
  }

}
