import { Component, OnDestroy, OnInit } from '@angular/core';
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

  currentUser: any;
  currentUserSubscription: Subscription | undefined;
  selectedFile: File | null = null;

constructor(public authService:MyApiCallsService){}

ngOnInit(): void {
  
  this.currentUserSubscription = this.authService.currentUser.subscribe(
    (user) => {
      this.currentUser = user;
    }
  );
}

ngOnDestroy(): void {
  
  if (this.currentUserSubscription) {
    this.currentUserSubscription.unsubscribe();
  }
}


onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length && 0) {
    this.selectedFile = input.files[0];
  }
}
uploadProfilePicture(): void {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userId', this.currentUser.id);

    this.authService.uploadProfilePicture(formData).subscribe(
      (res: any) => {
        if (res && res.success) {
          this.currentUser.profile_picture_url = res.profile_picture_url;
        } else {
          console.error('Error uploading profile picture', res.error);
        }
      },
      (error: any) => {
        console.error('Error uploading profile picture', error);
      }
    );
  }
}
}
