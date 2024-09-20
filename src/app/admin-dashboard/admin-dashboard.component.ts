import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyApiCallsService } from '../service/my-api-calls.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  manageMoneyForm: FormGroup;
  notificationForm: FormGroup;
  message: string = '';
  users: any[] = [];

  constructor(private fb: FormBuilder, private apiService: MyApiCallsService) {
    this.manageMoneyForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      operation: ['add', Validators.required],
    });

    this.notificationForm = this.fb.group({
      message: ['', Validators.required],
    });
  }
  manageMoney(): void {
    if (this.manageMoneyForm.valid) {
      const formData = this.manageMoneyForm.value;
      // Add logic for handling add/deduct money (call API)
    }
  }
  
  editUser(userId: number, data: any): void {
    this.apiService.editUser(userId, data).subscribe(response => {
      this.message = response.message;
      this.loadUsers();
    });
  }
  
  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(response => {
      this.message = response.message;
      this.loadUsers();  // Reload users after deletion
    });
  }

  postNotification(): void {
    if (this.notificationForm.valid) {
      this.apiService.postNotification(this.notificationForm.value).subscribe(response => {
        this.message = response.message;
      });
    }
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
}
