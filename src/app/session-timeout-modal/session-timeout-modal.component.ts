import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SessionService } from '../session.service';
@Component({
  selector: 'app-session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.css']
})
export class SessionTimeoutModalComponent {
  public onContinue$: Subject<void> = new Subject<void>();
  public onLogout$: Subject<void> = new Subject<void>();

  constructor(public bsModalRef: BsModalRef, private sessionService: SessionService) {}

  ngOnInit(): void {
    // Subscribe to the session timeout observable
    this.sessionService.onTimeout().subscribe(() => {
      // Perform actions when session timeout occurs
      console.log('Session timeout. Perform actions here.');
      // Optionally, trigger logout or other actions
      this.onContinue();
    });
  }

  onContinue(): void {
    // Notify the service that the user wants to continue
    this.sessionService.resetTimeout();
    this.bsModalRef.hide();
  }
  onLogout(): void {
    // Perform logout actions if needed
    this.bsModalRef.hide();
  }

}
