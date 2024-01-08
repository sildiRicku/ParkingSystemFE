import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.css']
})
export class SessionTimeoutModalComponent {
  public onContinue$: Subject<void> = new Subject<void>();
  public onLogout$: Subject<void> = new Subject<void>();

  constructor(public bsModalRef: BsModalRef) {}

  onContinue(): void {
    this.onContinue$.next();
    this.bsModalRef.hide();
  }

  onLogout(): void {
    this.onLogout$.next();
    this.bsModalRef.hide();
  }
}
