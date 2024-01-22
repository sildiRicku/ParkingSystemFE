import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SessionService } from '../session.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.css'],

})
export class SessionTimeoutModalComponent {
  public onContinue$: Subject<void> = new Subject<void>();
  public onLogout$: Subject<void> = new Subject<void>();

  constructor(public bsModalRef: BsModalRef, private sessionService: SessionService, private modalService:BsModalService) {}
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
