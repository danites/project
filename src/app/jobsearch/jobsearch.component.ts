import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DbService } from '../db.service';

@Component({
  selector: 'jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.css']
})
export class JobsearchComponent implements OnInit {

  private searchJobForm: FormGroup;
  private s_category = new FormControl("", Validators.required);
  private s_min_fee = new FormControl("", Validators.required);

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.searchJobForm = this.formBuilder.group({
      s_category: this.s_category,
      s_min_fee: this.s_min_fee
    });
  }

}
