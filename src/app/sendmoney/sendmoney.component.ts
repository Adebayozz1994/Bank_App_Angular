
import { Component } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sendmoney',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sendmoney.component.html',
  styleUrl: './sendmoney.component.css'
})
export class SendmoneyComponent {
  sendMoneyForm: FormGroup;
  message: string = '';
  buttonState: 'Send Money' | 'Sending' | 'Sent' = 'Send Money';
  accountName: string = '';

  constructor(private fb: FormBuilder, private authservice: MyApiCallsService,public Router:Router) {
    this.sendMoneyForm = this.fb.group({
      senderAccountNumber: ['', Validators.required],
      receiverAccountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }





  submit() {
    if (this.sendMoneyForm.valid) {
      this.buttonState = 'Sending';

      // Simulate an async operation
      setTimeout(() => {
        this.authservice.sendMoney(this.sendMoneyForm.value).subscribe(
          (res: any) => {
            this.message = res.message;
            this.buttonState = 'Sent';
            
            
            setTimeout(() => {
              this.Router.navigate(['/mainpage']);
              this.resetButtonState();
            }, 2000); 
          },
          (error) => {
            console.error('Error sending money:', error);
            this.message = 'Error sending money';
            this.resetButtonState();
          }
        );
      }, 1000); 
    }
  }

  private resetButtonState() {
   
    setTimeout(() => {
      this.buttonState = 'Send Money';
    }, 2000); 
  }
}
