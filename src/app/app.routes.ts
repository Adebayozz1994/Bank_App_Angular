import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';



export const routes: Routes = [
    {path:'', component: LandingpageComponent},
    {path:'navbar', component: NavbarComponent},
    {path:'signup', component: SignupComponent},
    {path:'login', component: LoginComponent},
    {path:'profile', component: ProfileComponent},
    {path:'about', component: AboutComponent},
    {path:'contact', component: ContactComponent},
    {path:'foo', component: ContactComponent},





];
