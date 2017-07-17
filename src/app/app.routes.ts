import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { JoblistComponent } from './joblist/joblist.component';
import { JobaddComponent } from './jobadd/jobadd.component';
import { ProfileComponent } from './profile/profile.component';

const MY_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'joblist', component: JoblistComponent },
  { path: 'jobadd', component: JobaddComponent },
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(MY_ROUTES);
