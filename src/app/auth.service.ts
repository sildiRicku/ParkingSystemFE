import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';
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
    if (password === 'wrong-password') {
      return throwError('Invalid credentials');
    }

    this.isLoggedIn = true;
    this.sessionService.setSessionCheckActive(false); // Disable session check during login


    const loginData = { username,password };
    console.log('Request payload:', loginData); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
  });


  return this.http.post(`${this.baseUrl}/login`, loginData, { headers, responseType: 'text' }).pipe(
    tap(() => {
      this.sessionService.setSessionCheckActive(true); // Enable session check after successful login

      this.sessionService.setUsername(username);
      this.sessionService.startSessionCheck();

    })
  );
}
logout() {
  this.isLoggedIn = false;
  this.sessionService.clearUsername();
  this.router.navigate(['/']);
}

isAuthenticated() {
  return this.isLoggedIn;
}
setAuthenticated(status: boolean): void {
  this.isLoggedIn = status;
}

startSessionCheck(): void {
  if (this.isLoggedIn) {
    this.sessionService.startSessionCheck();
  }
}
  }