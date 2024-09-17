import { Component, OnInit } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sendmoney',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.css']
})
export class SendmoneyComponent implements OnInit {
  sendMoneyForm: FormGroup;
  message: string = '';
  buttonState: 'Send Money' | 'Sending' | 'Sent' = 'Send Money';
  showModal: boolean = false;
  password: string = '';

  constructor(private fb: FormBuilder, private authService: MyApiCallsService, private router: Router) {
    this.sendMoneyForm = this.fb.group({
      senderAccountNumber: ['', Validators.required],
      receiverAccountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  openConfirmModal(): void {
    if (this.sendMoneyForm.valid) {
      // Set button state to 'Sending' first
      this.buttonState = 'Sending';

      // Simulate a short delay before showing the modal
      setTimeout(() => {
        this.showModal = true;
        this.buttonState = 'Send Money'; // Reset button state once modal is shown
      }, 2000); // Adjust delay if necessary
    }
  }

  confirmTransaction(): void {
    const data = {
      ...this.sendMoneyForm.value,
      password: this.password
    };

    this.buttonState = 'Sending';
    this.authService.sendMoney(data).subscribe(
      (res: any) => {
        this.message = res.message;
        this.buttonState = 'Sent';

        // Clear message after 3 seconds
        setTimeout(() => {
          this.message = '';
          this.resetButtonState();
          this.router.navigate(['/mainpage']);
        }, 3000);  // 3000ms = 3 seconds
      },
      (error) => {
        console.error('Error sending money:', error);
        this.message = 'Error sending money';

        // Clear message after 3 seconds
        setTimeout(() => {
          this.message = '';
        }, 3000);
        this.resetButtonState();
      }
    );
    
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
  }

  private resetButtonState(): void {
    setTimeout(() => {
      this.buttonState = 'Send Money';
    }, 2000);
  }
}
