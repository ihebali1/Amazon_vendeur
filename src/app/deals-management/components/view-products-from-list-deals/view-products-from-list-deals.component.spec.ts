import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsFromListDealsComponent } from './view-products-from-list-deals.component';

describe('ViewProductsFromListDealsComponent', () => {
  let component: ViewProductsFromListDealsComponent;
  let fixture: ComponentFixture<ViewProductsFromListDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductsFromListDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsFromListDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
