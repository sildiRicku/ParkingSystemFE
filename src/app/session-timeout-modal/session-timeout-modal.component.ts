import { ChangeDetectorRef, Component } from '@angular/core';
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
  private cdr: ChangeDetectorRef | undefined  

  constructor(public bsModalRef: BsModalRef, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.onTimeout().subscribe(() => {
      console.log('Session timeout. Perform actions here.');
      this.onContinue$.next(); 
    });
  }

  onContinue(): void {

    this.sessionService.resetTimeout();
    this.bsModalRef.hide();
  }

  onLogout(): void {
    this.bsModalRef.hide();
  }

  onClose(): void {
    this.bsModalRef.hide();
  }
}
