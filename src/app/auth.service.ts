import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8080'; 
  private isLoggedIn = false;


  constructor(private http: HttpClient,private router:Router) { }
  login(email: string, password: string): Observable<any> {

    this.isLoggedIn = true;
    setTimeout(() => {
      this.logout();
    }, 30000);

    const loginData = { username: email, password: password };
    console.log('Request payload:', loginData); 

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/login`, loginData, { withCredentials: true,
    responseType: 'text' });
}


logout() {
  this.isLoggedIn = false;

  this.router.navigate(['/']);
}

isAuthenticated() {
  return this.isLoggedIn;
}

  }