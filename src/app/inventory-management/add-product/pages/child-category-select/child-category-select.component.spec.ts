import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategorySelectComponent } from './child-category-select.component';

describe('ChildCategorySelectComponent', () => {
  let component: ChildCategorySelectComponent;
  let fixture: ComponentFixture<ChildCategorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCategorySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
