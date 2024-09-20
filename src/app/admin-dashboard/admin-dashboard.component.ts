import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';  // Corrected import

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] 
})
export class AdminDashboardComponent implements OnInit {
  depositData: any = {
    accountNumber: '',
    amount: 0,
    password: ''
  };
  accountName: string = '';  // Account holder's name
  message: string = '';
  isPasswordModalVisible: boolean = false;
  processing: boolean = false;

  constructor(private apiService: MyApiCallsService, private router: Router) {}

  ngOnInit(): void {}

  // Fetch account holder's name based on account number
  getAccountName(): void {
    if (this.depositData.accountNumber) {
      this.apiService.getAccountName(this.depositData.accountNumber).subscribe(
        (response) => {
          if (response && response.status === true) {
            this.accountName = response.accountName || '';  // Set the account holder's name
          } else {
            this.accountName = '';  // Clear account name if not found
            this.message = response.message || 'Account not found';
          }
        },
        (error) => {
          console.error('Error fetching account name:', error);
          this.message = 'Error fetching account name';
        }
      );
    }
  }

  // Open the password confirmation modal
  openPasswordModal(): void {
    this.processing = true;

    // Show "Processing" for 2 seconds before displaying the password modal
    setTimeout(() => {
      this.processing = false;
      this.isPasswordModalVisible = true;
    }, 2000);  // 2 seconds delay
  }

  // Close the modal
  closePasswordModal(): void {
    this.isPasswordModalVisible = false;
  }

  // Confirm deposit action (after password is entered)
  confirmDeposit(): void {
    this.processing = true;

    // Make the deposit API call with password
    this.apiService.deposit(this.depositData).subscribe(
      (response) => {
        if (response && response.status === true) {
          this.closePasswordModal();  // Close the modal first

          // Show success message after a short delay
          setTimeout(() => {
            this.message = 'Deposit successful';
            this.processing = false;

            // Navigate to the user profile after showing the success message
            setTimeout(() => {
              // this.router.navigate(['/profile']);
            }, 2000);  // 2 seconds delay before navigating to allow the message to be visible
          }, 500);  // Small delay before showing success message to ensure modal is closed

        } else {
          this.message = response.message || 'Deposit failed';
          this.processing = false;
        }
      },
      (error) => {
        console.error('Error making deposit:', error);
        this.message = 'Deposit failed due to an error';
        this.processing = false;
      }
    );
  }

  // Initial deposit action (opens modal for password confirmation)
  onDeposit(): void {
    if (!this.depositData.accountNumber || !this.depositData.amount) {
      this.message = 'Please fill in all fields';
      return;
    }
    // Open modal to confirm password before proceeding with the deposit
    this.openPasswordModal();
  }
}
