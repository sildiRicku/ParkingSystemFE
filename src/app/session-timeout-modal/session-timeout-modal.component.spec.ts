import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimeoutModalComponent } from './session-timeout-modal.component';

describe('SessionTimeoutModalComponent', () => {
  let component: SessionTimeoutModalComponent;
  let fixture: ComponentFixture<SessionTimeoutModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionTimeoutModalComponent]
    });
    fixture = TestBed.createComponent(SessionTimeoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
