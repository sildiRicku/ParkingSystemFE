import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimeoutDialogComponent } from './session-timeout-dialog.component';

describe('SessionTimeoutDialogComponent', () => {
  let component: SessionTimeoutDialogComponent;
  let fixture: ComponentFixture<SessionTimeoutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionTimeoutDialogComponent]
    });
    fixture = TestBed.createComponent(SessionTimeoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
