import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';

import { DbService } from '../db.service';

@Component({
  selector: 'jobemployer',
  templateUrl: './jobemployer.component.html',
  styleUrls: ['./jobemployer.component.css']
})
export class JobemployerComponent implements OnInit {

  private jobs = [];

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService) { }

  ngOnInit() {
    this.getPostedJobsByUser();
  }

  getPostedJobsByUser() {
    this.jobService.getPostedJobsByUser().subscribe(
      data => this.jobs = data,
      error => console.log(error)
    );
  }
}
