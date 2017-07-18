import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';

import { DbService } from '../db.service';

@Component({
  selector: 'app-getcandidates',
  templateUrl: './getcandidates.component.html',
  styleUrls: ['./getcandidates.component.css']
})
export class GetcandidatesComponent implements OnInit {

  @Input() jobId;

  private job = [];

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService) { }

  ngOnInit() {
    this.getCandidatesByJob();
  }

  getCandidatesByJob() {
    this.jobService.getCandidatesByJob(this.jobId).subscribe(
      data => this.job = data,
      error => console.log(error)
    );
  }

}
