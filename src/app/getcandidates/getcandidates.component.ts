import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

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
    private jobService: DbService, private router: Router, private activeRoute: ActivatedRoute) { }

  private infoMsg = { body: "", type: "info" };

  ngOnInit() {
    this.getCandidatesByJob();
  }

  getCandidatesByJob() {
    this.jobService.getCandidatesByJob(this.jobId).subscribe(
      data => this.job = data,
      error => console.log(error)
    );
  }

  hireCandidate(userId, hiredUserName) {
    this.jobService.hireCandidate(this.job, userId, hiredUserName).subscribe(
      res => {

        this.sendInfoMsg("Hired Successfully.", "success");
      },
      error => console.log(error)
    );

    window.location.href = 'http://localhost:4200/jobemployer';
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

}
