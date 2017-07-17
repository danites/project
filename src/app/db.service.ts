import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Router } from "@angular/router";

@Injectable()
export class DbService {
    dbport = 'http://localhost:4267';
    // private headers = new Headers({ 'Content-Type': 'application/json' });
    // private options = new RequestOptions({ headers: this.headers });

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    constructor (private http: Http, private router: Router) {}

    getJobs() {
        //return this.http.get('/jobs'); //.map(res => res.json())
        return this.http.get(this.dbport+'/jobs').map(res => res.json());
    }

    addJob(job) {
        var userId = localStorage['uniqueUser_token'];
        if(!userId){
            console.log('Unauthorized user');
            return null;
            //this.router.navigate(['/']); //We need to redirect to unauthorized
            //return "Unathorized user";
            }
		job["userId"] = userId;
        return this.http.post(this.dbport+"/job", JSON.stringify(job),this.options);
    }

    editJob(job) {
        return this.http.put(this.dbport+"/job/"+job._id, JSON.stringify(job), this.options);
    }

    deleteJob(job) {
        return this.http.delete(this.dbport+"/job/"+job._id);
    }
}
