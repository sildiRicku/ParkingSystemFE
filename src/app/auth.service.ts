import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8080'; // Change this to your Spring Boot backend URL

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const loginData = { username: email, password: password };
    console.log('Request payload:', loginData); // Add this line for debugging

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/login`, loginData, { headers: headers,  observe: 'response', // observe the full response
    responseType: 'text' , withCredentials: true});
}
  }