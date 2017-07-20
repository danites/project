import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Router } from "@angular/router";
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class DbService {
    dbport = 'http://localhost:4267';
    //  private headers = new Headers({ 'Content-Type': 'application/json' });
    // private options = new RequestOptions({ headers: this.headers });
    // private token =  localStorage.getItem('access_token') && localStorage.getItem('id_token');
    private token =  localStorage.getItem('uniqueUser_token') && localStorage.getItem('access_token');
    private headers = new Headers({
        'Content-Type': 'application/json',
        'longtitude': localStorage.getItem('locationLong') || 0,
        'latitude': localStorage.getItem('locationLat') || 0,
        'sender_userId': localStorage.getItem('uniqueUser_token') || 0,
        'sender_userName': localStorage.getItem('name') || 0,
        //'Bearer':  localStorage.getItem('id_token')
            // 'bearer':localStorage.getItem('bearer')|| 0 });        
    });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http, private router: Router, private auth: AuthService, private authhttp:AuthHttp) { }

    getJobs() {
        //return this.http.get('/jobs'); //.map(res => res.json())
        //return this.authhttp.get(this.dbport + '/jobs', this.options).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/jobs`).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getJobstoday() {
        console.log(`${environment.api.baseUrl}/jobstoday`);
        //return this.authhttp.get(this.dbport + '/jobstoday').map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/jobstoday`).map(res => res.json());
    }

    getJobstodaylimit10() {
        //return this.http.get('/jobs'); //.map(res => res.json())
        // return this.authhttp.get(this.dbport + '/jobstodaylimit10').map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/jobstodaylimit10`).map(res => res.json());
    }

    getJobstodaynearlimit10() {
        //return this.http.get('/jobs'); //.map(res => res.json())

        // return this.authhttp.get(this.dbport + '/jobstodaynearlimit10').map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/jobstodaynearlimit10`).map(res => res.json());
    }

    getAppliedJobsByUser() {
        var userId = localStorage['uniqueUser_token'];
        // return this.authhttp.get(this.dbport + '/jobsByUser/' + userId, this.options).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/jobsByUser/` + userId,this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getJobsHiredOfSeeker() {
        var userId = localStorage['uniqueUser_token'];
        // return this.authhttp.get(this.dbport + '/getJobsHiredOfSeeker/' + userId, this.options).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/getJobsHiredOfSeeker/` + userId,this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getPostedJobsByUser() {
        var userId = localStorage['uniqueUser_token'];
        // return this.authhttp.get(this.dbport + '/jobsPostedByUser/' + userId, this.options).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/jobsPostedByUser/` + userId,this.options).map(res => res.json());
        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    getJobsHiredByEmp() {
        var userId = localStorage['uniqueUser_token'];
        // return this.authhttp.get(this.dbport + '/getJobsHiredByEmp/' + userId, this.options).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/getJobsHiredByEmp/` + userId,this.options).map(res => res.json());

        // return this.http.get(this.dbport+'/jobstodaynearlimit10',this.options).map(res => res.json());
    }

    addJob(job) {
        var userId = localStorage['uniqueUser_token'];
        var userName = localStorage['name'];
        
        if (!userId) {
            console.log('Unauthorized user');
            return null;
            //this.router.navigate(['/']); //We need to redirect to unauthorized
            //return "Unathorized user";
        }
        // console.log('longtitude:'+job["location"][0]);
        // if(job["location"][0]>180 || job["location"][0]<-180) {
        //     console.log('Not on planet earth');
        //     return null;
        //     //this.router.navigate(['/']); //We need to redirect to unauthorized
        //     //return "Unathorized user";
        // }
        // if(job["location"][1]>180 || job["location"][1]<-180) {
        //     console.log('Not on planet earth');
        //     return null;
        //     //this.router.navigate(['/']); //We need to redirect to unauthorized
        //     //return "Unathorized user";
        // }
        job["userId"] = userId;
        job["userName"] = userName;
        // console.log("job DBService"+JSON.stringify(job));
        // console.log(`${environment.api.baseUrl}/jobadd`);

        // return this.authhttp.post(this.dbport + "/job", JSON.stringify(job), this.options);
        return this.authhttp.post(`${environment.api.baseUrl}/jobadd`, JSON.stringify(job), this.options);
    }

    editJob(job) {
        // return this.authhttp.put(this.dbport + "/job/" + job._id, JSON.stringify(job), this.options);
        return this.authhttp.put(`${environment.api.baseUrl}/job/` + job._id, JSON.stringify(job),this.options);
    }

    getJobById(id) {
       // console.log('getJobById:'+id);
        // return this.authhttp.get(this.dbport + "/job/" + id, this.options).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/job/` + id,this.options).map(res => res.json());
    }


    applyJob(job) {
        // return this.authhttp.put(this.dbport + "/jobapply/" + job._id, JSON.stringify(job), this.options);
        return this.authhttp.put(`${environment.api.baseUrl}/jobapply/` + job._id, JSON.stringify(job),this.options);
    }
    
    hireCandidate(job, hiredUserId, hiredUserName) {
        job["hired_user_id"] = hiredUserId;
        job["hired_userName"] = hiredUserName;
        // return this.authhttp.put(this.dbport + "/hireCandidate/" + job._id, JSON.stringify(job), this.options);
        return this.authhttp.put(`${environment.api.baseUrl}/hireCandidate/` + job._id, JSON.stringify(job),this.options);
    }

    searchJob(category, hourly_fee) {
        //console.log('dbservice:'+category + ', '  +hourly_fee)
        // let params = new URLSearchParams();
        let param = "/jobsearch?";
        if (category) {
            param += ("category=" + category);
            if (hourly_fee) {
                param += ("&hourly_fee=" + hourly_fee);
            }
        }
        else{
            if (hourly_fee) {
                param += ("hourly_fee=" + hourly_fee);
            }
        }
        // params.set('hourly_fee', hourly_fee);
        // params.set('longtitude',localStorage.getItem('locationLong'));
        // params.set('latitude', localStorage.getItem('locationLat'));
        //return this.http.put(this.dbport+"/search/"+job._id, JSON.stringify(job), this.options);
        //return this.http.get(this.dbport+"/jobsearch/",  { search: params });

        // return this.authhttp.get(this.dbport + param, this.options).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}` + param, this.options).map(res => res.json());

    }

    deleteJob(job) {
        // return this.authhttp.delete(this.dbport + "/job/" + job._id);
        return this.authhttp.delete(`${environment.api.baseUrl}/job/` + job._id);
    }

    getCandidatesByJob(id) {
        // return this.authhttp.get(this.dbport + '/getcandidatesbyjob/' + id).map(res => res.json());
        return this.authhttp.get(`${environment.api.baseUrl}/getcandidatesbyjob/` + id).map(res => res.json());
    }

    rateNow(job,comment,rating, flag) {
        // console.log('rating in dbService jobid:'+job._id);
        // console.log('rating in dbService comment:'+comment);
        // console.log('rating in dbService rating:'+rating);
        // console.log('rating in dbService flag:'+flag);

        if(comment && rating && flag){
                if(flag == "fromseeker"){
                    job["ratingToEmp"] = rating;
                    job["commentToEmp"] = comment;
                    
                }
                else{
                    job["ratingToSeeker"] = rating;
                    job["commentToSeeker"] = comment;                    
                }
               // console.log("rateing:"+JSON.stringify(job));
            }
        return this.authhttp.put(`${environment.api.baseUrl}/job/` + job._id, JSON.stringify(job),this.options);
    }
}
