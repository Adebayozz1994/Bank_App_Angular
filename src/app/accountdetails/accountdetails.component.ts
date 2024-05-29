import { Component, OnInit } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accountdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accountdetails.component.html',
  styleUrl: './accountdetails.component.css'
})
export class AccountdetailsComponent implements OnInit{

  accountDetails: any;
  accountId: number = 1; 

  constructor(private authService:MyApiCallsService) { }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails(): void {
    this.authService.getAccountDetails(this.accountId).subscribe(
      (response) => {
        if (response.status) {
          this.accountDetails = response.data;
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error fetching account details:', error);
      }
    );
  }
}
