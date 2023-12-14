import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/development-environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = environment.apiUrl;
  private isLoggedIn = false;
 

  constructor(private http: HttpClient,private router:Router) { }
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

  return this.http.post(`${this.baseUrl}/login`, loginData, { headers, responseType: 'text' });
}


logout() {
  this.isLoggedIn = false;
  this.router.navigate(['/']);
}

isAuthenticated() {
  return this.isLoggedIn;
}
  }