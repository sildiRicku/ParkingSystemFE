import { Component, HostListener } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-timeout-dialog',
  templateUrl: './session-timeout-dialog.component.html',
  styleUrls: ['./session-timeout-dialog.component.css']
})
export class SessionTimeoutDialogComponent {
  private countdown: number = 30; // Set the countdown time in seconds
  private countdownInterval: any;


  constructor(public dialogRef: MatDialogRef<SessionTimeoutDialogComponent>) {}
  @HostListener('window:mousemove') onMouseMove() {
    // Reset the countdown when the user is active
    this.resetCountdown();
  }
  extendSession(): void {
    this.dialogRef.close('extend');
    this.resetCountdown();
  }

  logout(): void {
    this.dialogRef.close('logout');
    this.resetCountdown();

  }

  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        // Redirect the user after the countdown
        this.logout();
      }
    }, 1000);
  }
  private resetCountdown(): void {
    clearInterval(this.countdownInterval);
    this.countdown = 30; // Reset the countdown
    this.startCountdown();
  }
}
