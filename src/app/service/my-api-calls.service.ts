import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MyApiCallsService {

  constructor(
    public http: HttpClient
  ) { };
  registerUser(data: any){
    return this.http.post('http://localhost/bankapp/frontendconnection.php', data);
  }
}