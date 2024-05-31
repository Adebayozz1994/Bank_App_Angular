
import { Component } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-sendmoney',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sendmoney.component.html',
  styleUrl: './sendmoney.component.css'
})
export class SendmoneyComponent {
  sendMoneyForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authservice: MyApiCallsService) {
    this.sendMoneyForm = this.fb.group({
      senderAccountNumber: ['', Validators.required],
      receiverAccountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }


  submit() {
    if (this.sendMoneyForm.valid) {
      this.authservice.sendMoney(this.sendMoneyForm.value).subscribe(
        (res: any) => {
          this.message = res.message;
        },
        (error) => {
          console.error('Error sending money:', error);
          this.message = 'Error sending money';
        }
      );
    }
  }
}
