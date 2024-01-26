import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SessionService } from '../session.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.css'],

})
export class SessionTimeoutModalComponent implements OnInit  {
  public onContinue$: Subject<void> = new Subject<void>();
  public onLogout$: Subject<void> = new Subject<void>();

  constructor(public bsModalRef: BsModalRef, private sessionService: SessionService, private modalService:BsModalService,private router: Router) {}

 
  
  ngOnInit(): void {
    this.sessionService.startSessionCheck();

  }
  onContinue(): void {
    console.log('OK button clicked in the modal.');
    this.onContinue$.next();
  }

  onClose(): void {
    this.router.navigate(['/login']);

    console.log('Modal closed without interaction.');
  }
}
