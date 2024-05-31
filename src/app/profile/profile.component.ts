import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{
  accountDetails: any;
  transactionHistory: any[] = [];
  currentUser: any;
  currentUserSubscription: Subscription | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  profilePictureUrl: string = '';

constructor(public authService:MyApiCallsService){}

ngOnInit(): void {
  this.authService.profilePicture.subscribe(url => {
    this.profilePictureUrl = url;
  });
 


  this.currentUserSubscription = this.authService.currentUser.subscribe(
    (user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.createOrGetAccount();
      }
    }
  );
}

createOrGetAccount(): void {
  this.authService.createOrGetAccount(this.currentUser.user_id).subscribe(
    (res: any) => {
      if (res && res.status === true) {
        this.accountDetails = res.account;
        this.loadTransactionHistory(this.accountDetails.account_id);
      }
    }
  );
}

ngOnDestroy(): void {
  
  if (this.currentUserSubscription) {
    this.currentUserSubscription.unsubscribe();
  }
}




uploadProfilePicture(): void {
  const file = this.fileInput.nativeElement.files?.[0]; 
  console.log(file);
  
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', this.currentUser.user_id);

    this.authService.uploadProfilePicture(formData).subscribe(
      (res: any) => {
        if (res && res.success) {
          console.log(res);
          this.currentUser.profile_picture = res.profile_picture_url;
        } else {
          console.error('Error uploading profile picture:', res.error);
        }
      },
      (error) => {
        console.error('Error uploading profile picture:', error);
      }
    );
  }
}


loadAccountDetails(): void {
  this.authService.getAccountDetails(this.currentUser.user_id).subscribe(
    (res: any) => {
      if (res && res.status === true) {
        this.accountDetails = res.account;
        this.loadTransactionHistory(this.accountDetails.user_id);
      }
    }
  );
}

loadTransactionHistory(accountId: string): void {
  this.authService.getTransactionHistory(accountId).subscribe(
    (res: any) => {
      if (res && res.status === true) {
        this.transactionHistory = res.transactions;
      }
    },
    (error) => {
      console.error('Error fetching transaction history:', error);
    }
  );
}
}
