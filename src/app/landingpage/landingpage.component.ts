import { Component } from '@angular/core';
import { MaterialmoduleModule } from '../materialmodule/materialmodule.module';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [MaterialmoduleModule,FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  constructor(public rout:Router){}
signup(){
  this.rout.navigate([`/signup`]);
}
login(){
  this.rout.navigate(['/login'])
}
}
