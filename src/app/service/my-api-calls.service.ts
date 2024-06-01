import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
    return this.http.post('http://localhost/bankapp/frontendconnection.php', data);
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
        })
      );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  uploadProfilePicture(data: FormData): Observable<any> {
    return this.http.post('http://localhost/bankapp/uploadhandler.php', data)
      .pipe(
        tap((res: any) => {
          if (res && res.success) {
            const updatedUser = { ...this.currentUserValue, profile_picture: res.profile_picture_url };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
            this.profilePictureSubject.next(res.profile_picture_url);
          }
        })
      );
  }

  createOrGetAccount(userId: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/createaccount.php', { user_id: userId });
  }

 

  sendMoney(transaction: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/send_receive.php', transaction);
  }

  // getAccountDetails(accountId: any): Observable<any> {
  //   return this.http.get(`http://localhost/bankapp/get_account_details.php?account_id=${accountId}`);
  // }

  getTransactionHistory(accountId: string): Observable<any> {
    return this.http.get(`http://localhost/bankapp/get_transaction_history.php?account_id=${accountId}`);
}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}