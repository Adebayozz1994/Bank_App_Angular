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

  currentUser: any;
  currentUserSubscription: Subscription | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

constructor(public authService:MyApiCallsService){}

ngOnInit(): void {
  
  this.currentUserSubscription = this.authService.currentUser.subscribe(
    (user) => {
      this.currentUser = user;
      // user['profile_picture'];
      console.log(user);
      // console.log(user['profile_picture']);
      
      
      
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
          this.currentUser.profile_picture = res.profile_picture;
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
}
