import { Injectable, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  @ViewChild('sessionTimeoutModal') sessionTimeoutModal!: TemplateRef<any>;
  modalRef!: BsModalRef;
  private sessionTimeout = 30 * 1000; 
  private lastActivity!: number;
  private username: string | null = null; 
  private timer: any;
  private timeoutSubject = new Subject<void>();

  constructor(private modalService: BsModalService,  private bsModalRef: BsModalRef,private zone: NgZone) {}


  openSessionTimeoutModal(sessionTimeoutModal: TemplateRef<any>): void {
    const bsModalRef: BsModalRef = this.modalService.show(sessionTimeoutModal, {
      class: 'modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef = bsModalRef; // Add this line

    if (bsModalRef.content) {
      bsModalRef.content?.onContinue$.subscribe(() =>  {
        console.log('User clicked continue. Resetting timeout.');
        this.resetTimeout();
      });
    
     
  bsModalRef.content?.onLogout$.subscribe(() => {
        console.log('User clicked logout. Logging out...');
      });
    }
  }

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
    console.log('Resetting timeout...');
    clearTimeout(this.timer);
    if (this.isSessionExpired()) {
      console.log('Session is expired. Triggering timeoutSubject.');
      this.timeoutSubject.next(); // Trigger the timeoutSubject
      this.showTimeoutModal();
    } else {
      this.timer = setTimeout(() => {
        console.log('Session timeout reached. Resetting timeout.');
        this.resetTimeout();
      }, this.sessionTimeout);
    }
  }

   
  private showTimeoutModal(): void {
    console.log('Showing timeout modal.');

    // Ensure the modalService exists before attempting to show the modal
    if (this.modalService) {
      // Use NgZone to run the modal display function inside Angular's zone
      this.zone.run(() => {
        // Show the modal
        this.modalRef = this.modalService.show(SessionTimeoutModalComponent, {
          class: 'modal-dialog-centered',
          backdrop: 'static',
          keyboard: false,
        });
      });
    } else {
      console.error('Modal service is not available.');
    }
  }}