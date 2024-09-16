import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialmoduleModule } from '../materialmodule/materialmodule.module';
import { MyApiCallsService } from '../service/my-api-calls.service';



interface ContactInterface{
  first_name:string,
  last_name:string,
  email:string,
  password:string,
  address: string, 
  phone_number:any,
  gender:string,
  role :string,
  // 
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,MaterialmoduleModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  constructor(public Router:Router,public MyApi:MyApiCallsService,public formBuilder:FormBuilder){}
  message:any=''
  public contact :ContactInterface ={
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    address:'',
    phone_number:'',
    gender:'',
    role:''
  
 }

 contactarray:any=[]
 submit() {

   const UserDetails = {
     first_name: this.contact.first_name,
     last_name: this.contact.last_name,
     email: this.contact.email,
     password: this.contact.password,
     address: this.contact.address,
     phone_number: this.contact.phone_number,
     gender: this.contact.gender,
     role: this.contact.role
   }
   console.log(UserDetails);

  //  console.log('Phone Number:', UserDetails.phone_number);
   this.MyApi.registerUser(UserDetails).subscribe(
    (res: any) => {
      console.log(res);
      if (res.status) {
        this.message = res.message; 
        this.Router.navigate(['/login']);
      } else {
        this.message = res.message;
      }
    },
    (error) => {
      console.error('API Error:', error);
      this.message = 'An error occurred during registration.';
    }
  );
}
  
}
