import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

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
import { JobsearchComponent } from './jobsearch/jobsearch.component';
// import {enableProdMode} from '@angular/core';
// enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ProfileComponent,
    JoblistComponent,
    JobaddComponent,
    JobsearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    
   
  ],
  providers: [AuthService,DbService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
