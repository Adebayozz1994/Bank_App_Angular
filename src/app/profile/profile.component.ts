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
}
