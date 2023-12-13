import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeout = 30 * 1000; 
  private lastActivity!: number;

  constructor() {  this.resetSession();
  }

  resetSession(): void {
    this.lastActivity = Date.now();
  }

  isSessionExpired(): boolean {
    const currentTime = Date.now();
    return currentTime - this.lastActivity > this.sessionTimeout;
  }
}
