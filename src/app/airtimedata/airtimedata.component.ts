import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-airtimedata',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './airtimedata.component.html',
  styleUrl: './airtimedata.component.css'
})
export class AirtimedataComponent {
  phoneNumber: string = '';
  amount: number | null = null;
  dataPhoneNumber: string = '';
  dataPlan: string = '';

  dataPlans: string[] = ['500MB', '1GB', '2GB', '5GB','10GB','15GB', '20GB', '30GB', '40GB', '50GB'];

  buyAirtime(): void {
    if (this.phoneNumber && this.amount) {
      console.log(`Buying airtime of amount ${this.amount} for phone number ${this.phoneNumber}`);
    
    }
  }

  buyData(): void {
    if (this.dataPhoneNumber && this.dataPlan) {
      console.log(`Buying data plan ${this.dataPlan} for phone number ${this.dataPhoneNumber}`);
     
    }
  }
}
