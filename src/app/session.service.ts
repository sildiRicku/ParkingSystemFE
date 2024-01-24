import { Injectable,Injector,NgZone,TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeout = 30000; // 30 seconds
  private lastActivity: number = Date.now();
  private username: string | null = null; 
  private timer: any;
  private timeoutSubject = new Subject<void>();
  private modalRef!: BsModalRef;
  private authService: AuthServiceService | undefined;

  constructor(private modalService: BsModalService,private zone: NgZone,private router: Router,private injector: Injector

 ) {}

 private getAuthService(): AuthServiceService {
  return this.injector.get(AuthServiceService);
}

    resetTimeout(): void {
      clearTimeout(this.timer);
  
      this.timer = setTimeout(() => {
        console.log('Session timeout reached. Showing modal.');
        this.showTimeoutModal()
      },this.sessionTimeout);
    }

    showTimeoutModal(): void {
      if (this.getAuthService().isAuthenticated()){
      let userActionTaken = false;
    
      this.zone.run(() => {
        this.modalRef = this.modalService.show(SessionTimeoutModalComponent, {
          class: 'modal-dialog-centered',
          backdrop: 'static',
          keyboard: false,
        });
    
        // Subscribe to user actions
        this.modalRef.content.onContinue$.subscribe(() => {
          console.log('Continue button clicked. Resetting timeout.');
          this.resetSession();
          userActionTaken = true;
          this.modalRef.hide();
        });
    
        this.modalRef.content.onLogout$.subscribe(() => {
          console.log('Logout button clicked. Redirecting to login page.');
          this.getAuthService().setAuthenticated(false);
          this.router.navigate(['/']);
          this.modalRef.hide();
        });
      });
    
      // Set a timeout to automatically logout if no action is taken
      setTimeout(() => {
        if (!userActionTaken) {
          console.log('No action taken. Redirecting to login page.');
          this.getAuthService().setAuthenticated(false);
          this.router.navigate(['/']);
          this.modalRef.hide(); // Make sure to hide the modal
        }
      }, 15000); // 15 seconds timeout
    }
  }
    
    resetSession(): void {
      this.lastActivity = Date.now();
      this.resetTimeout();
    }
    onUserActivity(): void {
      this.lastActivity = Date.now();
    }
  
    startSessionCheck(): void {
      this.resetTimeout();
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