import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiCallsService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = this.isBrowser() ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
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
    return this.http.post('http://localhost/bankapp/uploadhandler.php', data);
  }

  createAccount(userId: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/createaccount.php', { user_id: userId });
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post('http://localhost/bankapp/addtransaction.php', transaction);
  }

  // getAccountDetails(userId: any): Observable<any> {
  //   return this.http.get(`http://localhost/bankapp/get_account_details.php?user_id=${userId}`);
  // }

  // getTransactionHistory(accountId: any): Observable<any> {
  //   return this.http.get(`http://localhost/bankapp/get_transaction_history.php?account_id=${accountId}`);
  // }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}