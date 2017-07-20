///ratingToSeeker from Employee
import { Component, OnInit, Input ,ViewChild} from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { DbService } from '../db.service';


@Component({
  selector: 'app-rateseeker',
  templateUrl: './rateseeker.component.html',
  styleUrls: ['./rateseeker.component.css']
})
export class RateseekerComponent implements OnInit {

  @Input() jobId;
  @Input() flag;
  @Input() editMode;
  private myComment:String;
  private myRating:String = '1';
  private job = [];

  constructor(public auth: AuthService, private http: Http,
    private jobService: DbService, private router: Router, private activeRoute: ActivatedRoute) { }

  private infoMsg = { body: "", type: "info" };

  ngOnInit() {
    this.getJobById();
  }

  getJobById() {
    this.jobService.getJobById(this.jobId).subscribe(
      data => {
        this.job = data;
        this.myComment = data.ratingToSeeker || '';
        this.myRating = data.commentToSeeker || '';

      },
      error => console.log(error)
    );
  }

  rateNow(comment, rating) {
    if(!comment || !rating || comment.length==0)
      {
        this.sendInfoMsg("Please fill all required fields.", "fail");
        return false;
      }
    this.jobService.rateNow(this.job, comment, rating, this.flag).subscribe(
      res => {
        this.myComment =comment;
        this.myRating =rating;

        this.sendInfoMsg("Rated Successfully.", "success");
      },
      error => console.log(error)
    );

    //window.location.href = 'http://localhost:4200/jobseeker';
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

}
