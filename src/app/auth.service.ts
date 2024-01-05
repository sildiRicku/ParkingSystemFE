import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/development-environment/environment';
import { SessionService } from './session.service';
import { SessionTimeoutDialogComponent } from './session-timeout-dialog/session-timeout-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = environment.apiUrl;
  private isLoggedIn = false;


  constructor(private http: HttpClient,private router:Router,private sessionService: SessionService,private dialog: MatDialog  // Make sure this import is present

    ) { }
  login(username: string, password: string): Observable<any> {

    this.isLoggedIn = true;
    this.sessionService.resetSession(); // Reset session on login
    this.startSessionTimeout();

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

isAuthenticated() {
  return this.isLoggedIn;
}

private startSessionTimeout() {
  let active = true; // Flag to track user activity

  this.sessionService.startSessionTimeout(() => {
    const dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
      width: '300px',
      disableClose: true,
    });

    // Listen for mouse move events to track user activity during the countdown
    const mouseMoveListener = () => {
      active = true;
      this.sessionService.resetSession(); // Reset session on activity
      dialogRef.close(); // Close the dialog
      window.removeEventListener('mousemove', mouseMoveListener); // Remove the listener
    };

    window.addEventListener('mousemove', mouseMoveListener);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'extend') {
        this.sessionService.resetSession(); // Reset the session on extension
        active = false; // Reset the activity flag
        this.startSessionTimeout(); // Extend session
      } else {
        this.logout(); // Redirect to login page
      }
    });

    // Start a timer to close the dialog if there's no activity after 30 seconds
    setTimeout(() => {
      if (!active) {
        dialogRef.close('logout');
      }
    }, 30000); // 30 seconds
  });
}
logout() {
  this.isLoggedIn = false;
  this.sessionService.clearUsername();
  this.stopSessionTimeout(); // Stop session timeout on logout
  this.router.navigate(['/']);
}
private stopSessionTimeout() {
  this.sessionService.stopSessionTimeout();
}
  }