import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';

import { DbService } from '../db.service';

@Component({
  selector: 'joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
  
  private jobs = [];
  private isLoading = true;

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService) { }

  ngOnInit() {
    	this.getJobs();
  }


  getJobs() {
    this.jobService.getJobs().subscribe(
      data => this.jobs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
