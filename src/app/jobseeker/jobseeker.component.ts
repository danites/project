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

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      data => this.jobs = data,
      error => console.log(error)
    );
  }
}
