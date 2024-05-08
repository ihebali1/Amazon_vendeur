import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCouponComponent } from './details-coupon.component';

describe('DetailsCouponComponent', () => {
  let component: DetailsCouponComponent;
  let fixture: ComponentFixture<DetailsCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
