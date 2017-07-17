import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';

const MY_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(MY_ROUTES);
