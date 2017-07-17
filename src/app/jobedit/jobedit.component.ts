import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DbService } from '../db.service';

@Component({
  selector: 'jobedit',
  templateUrl: './jobedit.component.html',
  styleUrls: ['./jobedit.component.css']
})
export class JobeditComponent implements OnInit {

  private job = {};
  private infoMsg = { body: "", type: "info" };
   
  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  editJob(job) {
    this.jobService.editJob(job).subscribe(
      res => {
        this.job = job;
        this.sendInfoMsg("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

}
