import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DbService } from '../db.service';

@Component({
  selector: 'joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  private jobs = [];
  private job = {};
  private isLoading = true;
  private isEditing = false;

  private searchJobForm: FormGroup;
  private s_category = new FormControl("", Validators.required);
  private s_min_fee = new FormControl("", Validators.required);

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService, private router: Router, private formBuilder: FormBuilder, ) { }

  private infoMsg = { body: "", type: "info" };

  ngOnInit() {
    this.getJobs();

    this.searchJobForm = this.formBuilder.group({
      s_category: this.s_category,
      s_min_fee: this.s_min_fee
    });
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      data => this.jobs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(job) {
    this.isEditing = true;
    this.job = job;

    this.router.navigate(['/jobedit'], { queryParams: { job: this.job } });
  }

  cancelEditing() {
    this.isEditing = false;
    this.job = {};
    this.sendInfoMsg("item editing cancelled.", "warning");
    // reload the jobs to reset the editing
    this.getJobs();
  }

  editJob(job) {
    this.jobService.editJob(job).subscribe(
      res => {
        this.isEditing = false;
        this.job = job;
        this.sendInfoMsg("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  deleteJob(job) {
    if (window.confirm("Are you sure you want to permanently delete this item?")) {
      this.jobService.deleteJob(job).subscribe(
        res => {
          var pos = this.jobs.map(job => { return job._id }).indexOf(job._id);
          this.jobs.splice(pos, 1);
          this.sendInfoMsg("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

}
