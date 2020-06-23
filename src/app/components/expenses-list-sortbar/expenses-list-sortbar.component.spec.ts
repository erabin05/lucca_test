import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesListSortbarComponent } from './expenses-list-sortbar.component';

describe('ExpensesListSortbarComponent', () => {
  let component: ExpensesListSortbarComponent;
  let fixture: ComponentFixture<ExpensesListSortbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesListSortbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesListSortbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
