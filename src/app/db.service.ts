import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Router } from "@angular/router";

@Injectable()
export class DbService {
    dbport = 'http://localhost:4267';
    //  private headers = new Headers({ 'Content-Type': 'application/json' });
    // private options = new RequestOptions({ headers: this.headers });

    private headers = new Headers({
        'Content-Type': 'application/json',
        'longtitude': localStorage.getItem('locationLong') || 0,
        'latitude': localStorage.getItem('locationLat') || 0,
        'sender_userId': localStorage.getItem('uniqueUser_token') || 0,
        'sender_userName': localStorage.getItem('name') || 0
    });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private router: Router) { }

    getJobs() {
        //return this.http.get('/jobs'); //.map(res => res.json())
        return this.http.get(this.dbport + '/jobs', this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getJobstoday() {
        //return this.http.get('/jobs'); //.map(res => res.json())
        return this.http.get(this.dbport + '/jobstoday').map(res => res.json());
    }

    getJobstodaylimit10() {
        //return this.http.get('/jobs'); //.map(res => res.json())
        return this.http.get(this.dbport + '/jobstodaylimit10').map(res => res.json());
    }

    getJobstodaynearlimit10() {
        //return this.http.get('/jobs'); //.map(res => res.json())

        return this.http.get(this.dbport + '/jobstodaynearlimit10').map(res => res.json());
    }

    getAppliedJobsByUser() {
        var userId = localStorage['uniqueUser_token'];
        return this.http.get(this.dbport + '/jobsByUser/' + userId, this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getJobsHiredOfSeeker() {
        var userId = localStorage['uniqueUser_token'];
        return this.http.get(this.dbport + '/getJobsHiredOfSeeker/' + userId, this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getPostedJobsByUser() {
        var userId = localStorage['uniqueUser_token'];
        return this.http.get(this.dbport + '/jobsPostedByUser/' + userId, this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getJobsHiredByEmp() {
        var userId = localStorage['uniqueUser_token'];
        return this.http.get(this.dbport + '/getJobsHiredByEmp/' + userId, this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    addJob(job) {
        var userId = localStorage['uniqueUser_token'];
        if (!userId) {
            console.log('Unauthorized user');
            return null;
            //this.router.navigate(['/']); //We need to redirect to unauthorized
            //return "Unathorized user";
        }
        job["userId"] = userId;
        return this.http.post(this.dbport + "/job", JSON.stringify(job), this.options);
    }

    editJob(job) {
        return this.http.put(this.dbport + "/job/" + job._id, JSON.stringify(job), this.options);
    }

    getJobById(id) {
       // console.log('getJobById:'+id);
        return this.http.get(this.dbport + "/job/" + id, this.options).map(res => res.json());
    }


    applyJob(job) {
        return this.http.put(this.dbport + "/jobapply/" + job._id, JSON.stringify(job), this.options);
    }
    
    hireCandidate(job, hiredUserId, hiredUserName) {
        job["hired_user_id"] = hiredUserId;
        job["hired_userName"] = hiredUserName;
        return this.http.put(this.dbport + "/hireCandidate/" + job._id, JSON.stringify(job), this.options);
    }

    searchJob(category, hourly_fee) {
        //console.log('dbservice:'+category + ', '  +hourly_fee)
        // let params = new URLSearchParams();
        let param = "/jobsearch?";
        if (category) {
            param += ("category=" + category);
        }

        if (hourly_fee) {
            param += ("hourly_fee=" + hourly_fee);
        }
        // params.set('hourly_fee', hourly_fee);
        // params.set('longtitude',localStorage.getItem('locationLong'));
        // params.set('latitude', localStorage.getItem('locationLat'));
        //return this.http.put(this.dbport+"/search/"+job._id, JSON.stringify(job), this.options);
        //return this.http.get(this.dbport+"/jobsearch/",  { search: params });

        return this.http.get(this.dbport + param, this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());

    }

    deleteJob(job) {
        return this.http.delete(this.dbport + "/job/" + job._id);
    }

    getCandidatesByJob(id) {
        return this.http.get(this.dbport + '/getcandidatesbyjob/' + id).map(res => res.json());
    }

    rateNow(job,comment,rating, flag) {
        if(comment && rating && flag){
                if(flag == "fromseeker"){
                    job["commentToEmp"] = comment;
                    job["ratingToEmp"] = rating;
                }
                else{
                    job["ratingToSeeker"] = comment;
                    job["commentToSeeker"] = rating;                    
                }
               // console.log("rateing:"+JSON.stringify(job));
            }
        return this.http.put(this.dbport + "/job/" + job._id, JSON.stringify(job), this.options);
    }
}
