import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import { DbService } from '../db.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	private jobs = [];
	private isLoading = true;

	private job = {};
	private isEditing = false;

	private addJobForm: FormGroup;
	private name = new FormControl("", Validators.required);
	private age = new FormControl("", Validators.required);
	private weight = new FormControl("", Validators.required);

	private infoMsg = { body: "", type: "info"};

	constructor(public auth: AuthService, private http: Http,
				private jobService: DbService,
				private formBuilder: FormBuilder) {	}

	ngOnInit() {
		this.getJobs();

		this.addJobForm = this.formBuilder.group({
			name: this.name,
			age: this.age,
			weight: this.weight
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
		this.jobService.addJob(this.addJobForm.value).subscribe(
			res => {
				var newJob = res.json();
				this.jobs.push(newJob);
				this.addJobForm.reset();
				this.sendInfoMsg("item added successfully.", "success");
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
		if(window.confirm("Are you sure you want to permanently delete this item?")) {
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

