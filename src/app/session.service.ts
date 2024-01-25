import { HostListener, Injectable,Injector,NgZone,TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth.service';
import { SessionConfigService } from './session-config.service';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeout: number; 
  private lastActivity: number = Date.now();
  private username: string | null = null; 
  private timer: any;
  private timeoutSubject = new Subject<void>();
  private modalRef!: BsModalRef;
  private authService: AuthServiceService | undefined;

  constructor(private modalService: BsModalService,private zone: NgZone,private router: Router,private injector: Injector,private sessionConfigService: SessionConfigService
 ) {    this.sessionTimeout = this.sessionConfigService.getSessionTimeout();

 }

 private getAuthService(): AuthServiceService {
  return this.injector.get(AuthServiceService);
}

    onUserActivity(): void {
      this.lastActivity = Date.now();
      this.resetTimeout(); 
    }

    resetTimeout(): void {
      clearTimeout(this.timer);
  
      this.timer = setTimeout(() => {
        const isAuthenticated =this.getAuthService().isAuthenticated();
        if (isAuthenticated && !this.isUserActive()) {
          console.log('Session timeout reached. Showing modal.');
          this.showTimeoutModal();
        }
      },this.sessionTimeout);
    }
 
    showTimeoutModal(): void {
      let userActionTaken = false;
    
      this.zone.run(() => {
        this.modalRef = this.modalService.show(SessionTimeoutModalComponent, {
          class: 'modal-dialog-centered',
          backdrop: 'static',
          keyboard: false,
        });
    
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
    
      setTimeout(() => {
        if (!userActionTaken) {
          console.log('No action taken. Redirecting to login page.');
          this.getAuthService().setAuthenticated(false);
          this.router.navigate(['/']);
          this.modalRef.hide(); 
        }
      }, 15000); 
    }

    resetSession(): void {
      this.lastActivity = Date.now();
      this.resetTimeout();
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
  isUserActive(): boolean {
    const currentTime = Date.now();
    return currentTime - this.lastActivity < this.sessionTimeout;
  }
  }