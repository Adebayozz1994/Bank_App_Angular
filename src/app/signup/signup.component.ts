import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


interface ContactInterface{
  firstname:string,
  lastname:string,
  email:string,
  password:string
  address: string 
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  constructor(public Router:Router,public formBuilder:FormBuilder){}
  message:any=''
  public contact :ContactInterface ={
    firstname:'',
    lastname:'',
    email:'',
   password:'',
    address:''
  
 }

 contactarray:any=[]
 submit() {

   const UserDetails = {
     name: this.contact.firstname,
     last_name: this.contact.lastname,
     email: this.contact.email,
     password: this.contact.password,
     address: this.contact.address
   }
   console.log(UserDetails);
   
  }
}
