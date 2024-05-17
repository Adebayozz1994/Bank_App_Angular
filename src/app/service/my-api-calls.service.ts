import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class MyApiCallsService {
  // private apiUrl = 'http://localhost/bankapp/profile.php';
 
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

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
            this.currentUserSubject.next(response.user.userId); 
          }
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(null); 
  }


  uploadProfilePicture(data: FormData): Observable<any>{
    return this.http.post('http://localhost/bankapp/UploadHandler.php', data);
  }
 
}
