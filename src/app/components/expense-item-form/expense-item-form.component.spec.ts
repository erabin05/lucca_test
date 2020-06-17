import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItemFormComponent } from './expense-item-form.component';

describe('ExpenseItemFormComponent', () => {
  let component: ExpenseItemFormComponent;
  let fixture: ComponentFixture<ExpenseItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
