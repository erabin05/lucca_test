import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItemLineComponent } from './expense-item-line.component';

describe('ExpenseItemLineComponent', () => {
  let component: ExpenseItemLineComponent;
  let fixture: ComponentFixture<ExpenseItemLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseItemLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseItemLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
