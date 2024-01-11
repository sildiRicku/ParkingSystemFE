import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeout = 30 * 1000; 
  private lastActivity!: number;
  private username: string | null = null; 
  private  timeoutDuration = 30000; // 30 seconds
  private timer: any;
  private timeoutSubject = new Subject<void>();

  constructor(private modalService: BsModalService,  private bsModalRef: BsModalRef) {}


  clearTimeout(): void {
    clearTimeout(this.timer);
  }

  onTimeout(): Observable<void> {
    return this.timeoutSubject.asObservable();
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
  resetTimeout(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.isSessionExpired()) {
        this.showTimeoutModal();
      }
    }, this.timeoutDuration);
  }
   showTimeoutModal(): void {
    this.bsModalRef = this.modalService.show(SessionTimeoutModalComponent, {
      class: 'modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  
    this.bsModalRef.content.onContinue.subscribe(() => {
      this.resetTimeout();
    });
  
    this.bsModalRef.content.onLogout.subscribe(() => {
      console.log('Logging out...');
    });
  }
}

