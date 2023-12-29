import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/development-environment/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = environment.apiUrl;
  private isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  login(username: string, password: string, rememberMe: boolean = false): Observable<any> {
    this.isLoggedIn = true;

    if (!rememberMe) {
      setTimeout(() => {
        this.logout();
      }, 30000);
    }

    const loginData = { username, password };
    console.log('Request payload:', loginData);

    const headers = this.createHeaders(loginData);

    const apiUrl = `${this.baseUrl}/login`;
    
    return this.http.post(apiUrl, loginData, { headers, responseType: 'text' }).pipe(
      tap(() => {
        if (rememberMe) {
          this.sessionService.setUsername(username);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  private createHeaders(loginData: { username: string; password: string }): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.sessionService.clearUsername();
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
