import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '../session.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-session-timeout-dialog',
  templateUrl: './session-timeout-dialog.component.html',
  styleUrls: ['./session-timeout-dialog.component.css']
})
export class SessionTimeoutDialogComponent  implements OnInit {
  private countdown: number = 30; 
  private countdownInterval: any;
 


  constructor(public dialogRef: MatDialogRef<SessionTimeoutDialogComponent>,private sessionService: SessionService,private dialog: MatDialog) {}
  ngOnInit() {
    this.startCountdown();
  }

  @HostListener('window:mousemove')
  onMouseMove() {
    this.resetCountdown();
  }

  extendSession(): void {
    this.dialogRef.close('extend');
    this.resetCountdown();
  }


  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        // Redirect the user after the countdown
        this.dialogRef.close();
      }
    }, 1000);
  }

  private resetCountdown(): void {
    clearInterval(this.countdownInterval);
    this.countdown = 15; 
    this.startCountdown();
  }
}
