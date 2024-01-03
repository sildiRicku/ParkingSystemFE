import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private lastActivity!: number;
  private username: string | null = null; 
  private sessionExpirationInterval: any;
  private sessionTimeout = 30 * 1000; // Set your session timeout duration
  private sessionTimer: any; // Variable to hold the session timer


  constructor() {
    this.resetSession();
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
  startSessionTimeout(callback: () => void): void {
    this.stopSessionTimeout(); // Clear existing timer
    this.sessionTimer = setTimeout(() => {
      callback();
    }, this.sessionTimeout);
  }
  stopSessionTimeout(): void {
    clearTimeout(this.sessionTimer);
  }
}
