import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { JoblistComponent } from './joblist/joblist.component';
import { JobaddComponent } from './jobadd/jobadd.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { JobemployerComponent } from './jobemployer/jobemployer.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './app.guard';
const MY_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'joblist', component: JoblistComponent ,canActivate:[AuthGuard]},
  { path: 'jobadd', component: JobaddComponent,canActivate:[AuthGuard] },
  { path: 'jobseeker', component: JobseekerComponent,canActivate:[AuthGuard] },
  { path: 'jobemployer', component: JobemployerComponent,canActivate:[AuthGuard] },
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(MY_ROUTES);
