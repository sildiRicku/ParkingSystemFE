import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/development-environment/environment';
import { SessionService } from './session.service';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  {
  private baseUrl = environment.apiUrl;
  private isLoggedIn = false;


  constructor(private http: HttpClient,private router:Router,private sessionService: SessionService) { }
  login(username: string, password: string): Observable<any> {
    this.isLoggedIn = true;
    const loginData = { username,password };
    console.log('Request payload:', loginData); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
  });


  return this.http.post(`${this.baseUrl}/login`, loginData, { headers, responseType: 'text' }).pipe(
    tap(() => {
      this.sessionService.setUsername(username);
      this.sessionService.startSessionCheck();

    })
  );
}
logout() {
  this.sessionService.clearUsername();
  this.router.navigate(['/']);
}

isAuthenticated() {
  return this.isLoggedIn;
}
setAuthenticated(status: boolean): void {
  this.isLoggedIn = status;
}
  }