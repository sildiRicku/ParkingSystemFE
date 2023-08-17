import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulePageComponent } from './rule-page.component';

describe('SecondPageComponent', () => {
  let component: RulePageComponent;
  let fixture: ComponentFixture<RulePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RulePageComponent]
    });
    fixture = TestBed.createComponent(RulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
