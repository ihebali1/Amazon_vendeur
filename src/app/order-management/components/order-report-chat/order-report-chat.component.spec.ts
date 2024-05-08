import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReportChatComponent } from './order-report-chat.component';

describe('OrderReportChatComponent', () => {
  let component: OrderReportChatComponent;
  let fixture: ComponentFixture<OrderReportChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReportChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReportChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
