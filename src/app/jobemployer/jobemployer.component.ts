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
  private jobsHired = [];

  private infoMsg = { body: "", type: "info" };

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService) { }

  ngOnInit() {
    this.getPostedJobsByUser();
    this.getJobsHiredByEmp();
  }

  getPostedJobsByUser() {
    this.jobService.getPostedJobsByUser().subscribe(
      data => this.jobs = data,
      error => console.log(error)
    );
  }

  getJobsHiredByEmp() {
    this.jobService.getJobsHiredByEmp().subscribe(
      data => this.jobsHired = data,
      error => console.log(error)
    );
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }


}
