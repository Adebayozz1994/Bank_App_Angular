import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { log } from 'console';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone_number: string;
  gender: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user: any;

  constructor(public authService:MyApiCallsService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  
  
}


// 