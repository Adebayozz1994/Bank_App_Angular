import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent implements OnInit{
  currentUser: any;
  currentUserSubscription: Subscription | undefined;

  constructor(public authService:MyApiCallsService){}

ngOnInit(): void {
  this.currentUserSubscription = this.authService.currentUser.subscribe(
    (user) => {
      this.currentUser = user;
      if (this.currentUser) {
        console.log(this.currentUser)
      }
    }
  );
}


}
