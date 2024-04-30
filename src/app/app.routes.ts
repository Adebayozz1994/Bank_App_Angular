import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    {path:'navbar', component: NavbarComponent},
    {path:'signup', component: SignupComponent},

];
