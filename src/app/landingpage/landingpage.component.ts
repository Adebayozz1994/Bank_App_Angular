import { Component } from '@angular/core';
import { MaterialmoduleModule } from '../materialmodule/materialmodule.module';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [MaterialmoduleModule,],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
