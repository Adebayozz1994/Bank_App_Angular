import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiCallsService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private profilePictureSubject: BehaviorSubject<string>;
  public profilePicture: Observable<string>;

  constructor(private http: HttpClient) {
    const storedUser = this.isBrowser() ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;
    
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();

    this.profilePictureSubject = new BehaviorSubject<string>('');
    this.profilePicture = this.profilePictureSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  registerUser(data: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/frontendconnection.php', data)
      .pipe(
        tap((response: any) => {
          // Handle response if needed
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred during registration.'));
        })
      );
  }
    
  login(data: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/login.php', data)
      .pipe(
        tap((response: any) => {
          if (response && response.status === true) {
            if (this.isBrowser()) {
              localStorage.setItem('currentUser', JSON.stringify(response.user.userId));
            }
            this.currentUserSubject.next(response.user.userId);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred during login.'));
        })
      );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  updateUser(user: any) {
    this.currentUserSubject.next(user);
  }
  
  uploadProfilePicture(data: FormData): Observable<any> {
    return this.http.post('http://localhost/bankapp/uploadhandler.php', data)
      .pipe(
        tap((res: any) => {
          if (res && res.success) {
            // Update the current user with the new profile picture URL
            const updatedUser = { ...this.currentUserSubject.value, profile_picture: res.profile_picture_url };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
            this.profilePictureSubject.next(res.profile_picture_url);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while uploading profile picture.'));
        })
      );
  }
  

  createOrGetAccount(userId: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/createaccount.php', { user_id: userId })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while creating or getting account.'));
        })
      );
  }

  sendMoney(transaction: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/send_receive.php', transaction)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while sending money.'));
        })
      );
  }
  getAccountName(accountNumber: string): Observable<any> {
    return this.http.get(`http://localhost/bankapp/getAccountName.php?accountNumber=${accountNumber}`);
  }
  
  getTransactionHistory(accountId: string): Observable<any> {
    return this.http.get(`http://localhost/bankapp/get_transaction_history.php?account_id=${accountId}`)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while fetching transaction history.'));
        })
      );
  }

  buyAirtime(accountId: number, phoneNumber: string, amount: number): Observable<any> {
    return this.http.post('http://localhost/bankapp/buyairtime.php', { accountId, phoneNumber, amount })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while buying airtime.'));
        })
      );
  }

  buyData(accountId: number, phoneNumber: string, dataPlan: string, amount: number): Observable<any> {
    return this.http.post('http://localhost/bankapp/buydata.php', { accountId, phoneNumber, dataPlan, amount })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while buying data.'));
        })
      );
  }

  getAccountBalance(accountId: number): Observable<number> {
    return this.http.get<number>(`http://localhost/bankapp/get_account_details.php?account_id=${accountId}`)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while fetching account balance.'));
        })
      );
  }
  deposit(data: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/deposit.php', data)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(() => new Error('An error occurred while depositing money.'));
        })
      );
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.post('http://localhost/bankapp/deleteuser.php', { user_id: userId }).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Error deleting user.'));
      })
    );
  }

  editUser(userId: number, data: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/edituser.php', { user_id: userId, ...data }).pipe(
      catchError(error => {
        console.error('Error editing user:', error);
        return throwError(() => new Error('Error editing user.'));
      })
    );
  }


  postNotification(data: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/post_notification.php', data);
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost/bankapp/get_users.php').pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Error fetching users.'));
      })
    );
  }
  


}
