import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPayoutComponent } from './details-payout.component';

describe('DetailsPayoutComponent', () => {
  let component: DetailsPayoutComponent;
  let fixture: ComponentFixture<DetailsPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
