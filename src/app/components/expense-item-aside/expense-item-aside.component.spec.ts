import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItemAsideComponent } from './expense-item-aside.component';

describe('ExpenseItemAsideComponent', () => {
  let component: ExpenseItemAsideComponent;
  let fixture: ComponentFixture<ExpenseItemAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseItemAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseItemAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
