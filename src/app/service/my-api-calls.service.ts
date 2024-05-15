import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class MyApiCallsService {
  
  // private profileUrl = 'http://localhost/bankapp/profile.php';
  constructor(
    public http: HttpClient
  ) { };
  registerUser(data: any){
    return this.http.post('http://localhost/bankapp/frontendconnection.php', data);
  }
  login(data: any) {
    return this.http.post('http://localhost/bankapp/login.php', data);
  }

  // profile(): Observable<any> {
  //   return this.http.get<any>(this.profileUrl);
  // }
  user:any
}
