import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/development-environment/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements OnInit  {
  private baseUrl = environment.apiUrl;
  private isLoggedIn = false;


  constructor(private http: HttpClient,private router:Router,private sessionService: SessionService) { }
  login(username: string, password: string): Observable<any> {

    this.isLoggedIn = true;
    setTimeout(() => {
      this.logout();
    }, 30000);

    const loginData = { username,password };
    console.log('Request payload:', loginData); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
  });


  return this.http.post(`${this.baseUrl}/login`, loginData, { headers, responseType: 'text' }).pipe(
    tap(() => {
      this.sessionService.setUsername(username);
    })
  );
}


logout() {
  this.isLoggedIn = false;
  this.sessionService.clearUsername(); 
  this.router.navigate(['/']);
}

ngOnInit(): void {
  window.addEventListener('mousemove', () => this.sessionService.resetTimeout());
  window.addEventListener('keypress', () => this.sessionService.resetTimeout());

  this.sessionService.onTimeout().subscribe(() => {
    this.sessionService.showTimeoutModal();
  });
}
isAuthenticated() {
  return this.isLoggedIn;
}
  }