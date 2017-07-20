import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RouterModule } from '@angular/router';
import { Http, HttpModule, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DbService } from './db.service'
import { AuthGuard } from './app.guard';

import { routing } from "./app.routes";

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { JoblistComponent } from './joblist/joblist.component';
import { JobaddComponent } from './jobadd/jobadd.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { JobemployerComponent } from './jobemployer/jobemployer.component';
import { GetcandidatesComponent } from './getcandidates/getcandidates.component';
import { RateuserComponent } from './rateuser/rateuser.component';
import { RateseekerComponent } from './rateseeker/rateseeker.component';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { MiddleService } from './Mid.service';
// import {enableProdMode} from '@angular/core';
// enableProdMode();
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ProfileComponent,
    JoblistComponent,
    JobaddComponent,
    JobseekerComponent,
    JobemployerComponent,
    GetcandidatesComponent,
    RateuserComponent,
    RateseekerComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    
   
  ],
  providers: [AuthService,DbService,
      AuthGuard,
      MiddleService,
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, RequestOptions]
        }
    
    ],
  bootstrap: [AppComponent]
})


export class AppModule { }
