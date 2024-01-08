import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeout = 30 * 1000; 
  private lastActivity!: number;
  private username: string | null = null; 
  private readonly timeoutDuration = 30000; // 30 seconds
  private timer: any;
  private bsModalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}


  resetTimeout(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.showTimeoutModal();
    }, this.timeoutDuration);
  }
  clearTimeout(): void {
    clearTimeout(this.timer);
  }

  private showTimeoutModal(): void {
    this.bsModalRef = this.modalService.show(SessionTimeoutModalComponent, {
      class: 'modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });

    this.bsModalRef.content.onContinue.subscribe(() => {
      this.resetTimeout();
    });

    this.bsModalRef.content.onLogout.subscribe(() => {
      // Redirect to logout or login page as needed
      // For now, let's log out
      console.log('Logging out...');
    });
  }
  resetSession(): void {
    this.lastActivity = Date.now();
  }
  setUsername(username: string): void {
 this.username=username; 
 sessionStorage.setItem('username', username); 
 }

  getUsername(): string | null {
    return this.username;
  }
  clearUsername(): void {
    this.username = null;
    sessionStorage.removeItem('username'); 

  }

  isSessionExpired(): boolean {
    const currentTime = Date.now();
    return currentTime - this.lastActivity > this.sessionTimeout;
  }
}
