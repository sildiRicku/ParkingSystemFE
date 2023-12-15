import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeout = 30 * 1000; 
  private lastActivity!: number;
  private username: string | null = null; 

  constructor() {  this.resetSession();
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
