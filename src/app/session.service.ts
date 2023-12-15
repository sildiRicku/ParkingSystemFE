import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeout = 30 * 1000; 
  private lastActivity!: number;
  private username!: string;

  constructor() {  this.resetSession();
  }

  resetSession(): void {
    this.lastActivity = Date.now();
  }
  setUsername(username: string): void {
    sessionStorage.setItem('session', username); 
  }

  getUsername(): string | null {
    return sessionStorage.getItem('session'); 
  }


  isSessionExpired(): boolean {
    const currentTime = Date.now();
    return currentTime - this.lastActivity > this.sessionTimeout;
  }
}
