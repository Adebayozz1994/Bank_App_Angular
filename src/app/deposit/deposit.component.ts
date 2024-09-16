import { Component } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  depositData = {
    accountNumber: '',
    amount: 0
  };
  message = '';

  constructor(private apiService: MyApiCallsService, private router: Router) {}

  onDeposit() {
    if (this.depositData.amount <= 0) {
      this.message = 'Amount must be greater than zero.';
      return;
    }

    this.apiService.deposit(this.depositData).subscribe(
      response => {
        if (response.status) {
          this.message = 'Deposit successful!';
        } else {
          this.message = response.message || 'Deposit failed.';
        }
      },
      error => {
        console.error('Error:', error);
        this.message = 'An error occurred while processing the deposit.';
      }
    );
  }
}
