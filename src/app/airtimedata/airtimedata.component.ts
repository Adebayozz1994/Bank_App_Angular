import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialmoduleModule } from '../materialmodule/materialmodule.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-airtimedata',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialmoduleModule],
  templateUrl: './airtimedata.component.html',
  styleUrls: ['./airtimedata.component.css']
})
export class AirtimedataComponent implements OnInit, OnDestroy {
  accountDetails: any;
  phoneNumber: string = '';
  amount: number | null = null;
  dataPhoneNumber: string = '';
  dataPlan: string = '';
  accountBalance: number = 0;
  dataPlans: string[] = ['500MB', '1GB', '2GB', '5GB', '10GB', '15GB', '20GB', '30GB', '40GB', '50GB'];
  currentUser: any;
  currentUserSubscription: Subscription | undefined;

  constructor(private _snackBar: MatSnackBar, private authService: MyApiCallsService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        if (this.currentUser) {
          this.createOrGetAccount();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  createOrGetAccount(): void {
    this.authService.createOrGetAccount(this.currentUser.user_id).subscribe(
      (res: any) => {
        if (res && res.status === true) {
          this.accountDetails = res.account;
          this.accountBalance = this.accountDetails.balance;
          console.log('Account details:', this.accountDetails);
          
        }
      },
      (error) => {
        console.error('Error in createOrGetAccount:', error);
      }
    );
  }

  openSnackBar(message: string, action: string = 'Close') {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  buyAirtime(): void {
    if (this.phoneNumber && this.amount && this.accountDetails && this.accountDetails.account_number) {
      this.authService.buyAirtime(this.accountDetails.account_number, this.phoneNumber, this.amount).subscribe(
        (res: any) => {
          if (res.status) {
            this.openSnackBar('Airtime purchased successfully!', 'Close');
            this.updateBalance();
          } else {
            this.openSnackBar('Failed to purchase airtime.', 'Close');
          }
        },
        (error) => {
          console.error('Error purchasing airtime:', error);
          this.openSnackBar('An error occurred.', 'Close');
        }
      );
    }
  }

  buyData(): void {
    if (this.dataPhoneNumber && this.dataPlan && this.amount && this.accountDetails && this.accountDetails.account_number) {
      this.authService.buyData(this.accountDetails.account_number, this.dataPhoneNumber, this.dataPlan, this.amount).subscribe(
        (res: any) => {
          if (res.status) {
            this.openSnackBar('Data purchased successfully!', 'Close');
            this.updateBalance();
          } else {
            this.openSnackBar('Failed to purchase data.', 'Close');
          }
        },
        (error) => {
          console.error('Error purchasing data:', error);
          this.openSnackBar('An error occurred.', 'Close');
        }
      );
    }
  }

  updateBalance(): void {
    if (this.accountDetails && this.accountDetails.account_number) {
      this.authService.getAccountBalance(this.accountDetails.account_number).subscribe(
        (balance: number) => {
          this.accountBalance = balance;
        },
        (error) => {
          console.error('Error fetching balance:', error);
        }
      );
    }
  }
}
