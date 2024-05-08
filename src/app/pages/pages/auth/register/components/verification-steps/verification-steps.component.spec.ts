import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationStepsComponent } from './verification-steps.component';

describe('VerificationStepsComponent', () => {
  let component: VerificationStepsComponent;
  let fixture: ComponentFixture<VerificationStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
