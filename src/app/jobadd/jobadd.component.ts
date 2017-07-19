import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DbService } from '../db.service';

@Component({
  selector: 'jobadd',
  templateUrl: './jobadd.component.html',
  styleUrls: ['./jobadd.component.css']
})
export class JobaddComponent implements OnInit {

  private jobs = [];
  private job = {};
  private isLoading = true;
  private isEditing = false;

  private addJobForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private description = new FormControl("", Validators.required);
  private category = new FormControl("", Validators.required);
  private hourly_fee = new FormControl("", Validators.required);
  private preferred_date = new FormControl("", Validators.required);
  private location = new FormControl("", Validators.required);
  // private longtitude = new FormControl("", Validators.required);
  // private latitude = new FormControl("", Validators.required);

  private infoMsg = { body: "", type: "info" };

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getJobs();

    this.addJobForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      category: this.category,
      preferred_date: this.preferred_date,
      hourly_fee: this.hourly_fee,
			location: this.formBuilder.group({
				'longtitude': ['', [Validators.required]],
				'latitude': ['', [Validators.required]],
			}),
    });
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      data => this.jobs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addJob() {
    var job = this.addJobForm.value;
    // console.log("job"+JSON.stringify(job));
    // console.log("job"+JSON.stringify(job["location"]["longtitude"]));
    // console.log("job"+JSON.stringify(job["location"]["latitude"]));
   // job["location"] = [-94.968,44.0166];
    job["location"] = [job["location"]["longtitude"],job["location"]["latitude"]];
    // job["location"] =null;

    this.jobService.addJob(job).subscribe(
      res => {
        var newJob = res.json();
        console.log(newJob);
        console.log(this.addJobForm.value);
        this.jobs.push(newJob);
        this.addJobForm.reset();
        this.sendInfoMsg("item added successfully.", "success");

        this.router.navigate(['/joblist']);
      },
      error => console.log(error)
    );
  }

  enableEditing(job) {
    this.isEditing = true;
    this.job = job;
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
