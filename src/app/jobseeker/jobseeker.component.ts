import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';

import { DbService } from '../db.service';

@Component({
  selector: 'jobseeker',
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.css']
})
export class JobseekerComponent implements OnInit {

  private jobs = [];
  private jobsHired = [];

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService) { }

  ngOnInit() {
    this.getAppliedJobsByUser();
    this.getJobsHiredOfSeeker();
  }

  getAppliedJobsByUser() {
    this.jobService.getAppliedJobsByUser().subscribe(
      data => this.jobs = data,
      error => console.log(error)
    );
  }

  getJobsHiredOfSeeker() {
    this.jobService.getJobsHiredOfSeeker().subscribe(
      data => this.jobsHired = data,
      error => console.log(error)
    );
  }

  ratingToEmp() {
    this.jobService.ratingToEmp(45).subscribe(
      data => this.jobsHired = data,
      error => console.log(error)
    );
  }
}
