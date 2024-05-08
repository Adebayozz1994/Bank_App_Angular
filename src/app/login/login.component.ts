import { Component } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { log } from 'console';


interface LoginData {
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginData = { email: '', password: '' };
  message: string = '';

  constructor(public authService:MyApiCallsService,public rout:Router) {}

  onSubmit() {
    console.log('Form submitted:', this.loginData);
    this.authService.login(this.loginData).subscribe((res: any) => {
        if (res.status === true) {
          this.message = res.message;
          
        } else {
          this.message = res.message;
        }
      },
      
    );
  }
}
