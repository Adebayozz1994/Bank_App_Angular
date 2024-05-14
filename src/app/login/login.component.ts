import { Component, OnInit } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



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
export class LoginComponent implements OnInit{
 public email = ''
 public password = ''
public studentarray: LoginData[] = [];
 message = ''

  constructor(public authService:MyApiCallsService,public rout:Router) {}
  ngOnInit(): void {
    this.studentarray = JSON.parse(localStorage['Userdetails']);
    console.log(this.studentarray);
    
  }
  onSubmit(){
    console.log(this.email,this.password);
    let user = this.studentarray.find((users:any, index:any)=>users.email===this.email && users.password===this.password)
    console.log(user);
    if(!user || user.email == "" && user.password == ""){
      this.message="invalid username or password"
   setTimeout(() => {
          this.message = ''; 
      }, 2000);
  console.log("login failed");
  
}
else{

  this.authService.user = user;
  this.rout.navigate(['/profile'], { state: { user } });
  console.log("login successfull");
}
}
}

  
    // this.authService.login(this.loginData).subscribe(
    //   (res: any) => {
    //     if (res && res.status === true) {
    //       console.log('Login successful:', res.message);
          
    //       this.rout.navigate(['/profile']);
    //     } else {
    //       console.log('Login failed:', res.message);
          
    //     }
    //   },
    //   (error) => {
    //     console.error('Login error:', error);
        
    //   }
    // );
  


