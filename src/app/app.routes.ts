import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';



export const routes: Routes = [
    {path:'', component: LandingpageComponent},
    {path:'navbar', component: NavbarComponent},
    {path:'signup', component: SignupComponent},
    {path:'login', component: LoginComponent},
    {path:'profile', component: ProfileComponent},

];
