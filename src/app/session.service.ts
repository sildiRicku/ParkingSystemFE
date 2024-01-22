import { Injectable,NgZone,TemplateRef, ViewChild } from '@angular/core';
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
  private timer: any;
  private timeoutSubject = new Subject<void>();
  private modalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService,private zone: NgZone
    ) {}



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
  openSessionTimeoutModal(): void {
    console.log('Trying to open session timeout modal.');
    this.modalRef = this.modalService.show(SessionTimeoutModalComponent, {
      class: 'modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
    console.log('Modal reference:', this.modalRef);
  }
  
  resetTimeout(): void {
    console.log('Resetting timeout...');
    clearTimeout(this.timer);
    if (this.isSessionExpired()) {
      console.log('Session is expired. Triggering timeoutSubject.');
      this.timeoutSubject.next(); // Trigger the timeoutSubject
      setTimeout(() => {
      }, 0); // Use setTimeout to ensure the modal is shown in the next tick
    } else {
      this.timer = setTimeout(() => {
        console.log('Session timeout reached. Resetting timeout.');
        this.resetTimeout();
      }, this.sessionTimeout);
    }
  }
  showTimeoutModal(): void {
    console.log('Showing timeout modal.');
    this.zone.run(() => {
      this.modalRef = this.modalService.show(SessionTimeoutModalComponent, {
        class: 'modal-dialog-centered',
        backdrop: 'static',
        keyboard: false,
      });
    });
  }
  }