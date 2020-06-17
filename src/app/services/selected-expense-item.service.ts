import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ExpenseItem } from '../entities/expense-item';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class SelectedExpenseItemService {
  private selectedExpenseItemSubject = new Subject<ExpenseItem>();

  constructor() { }

  get(): Observable<ExpenseItem> {
    return this.selectedExpenseItemSubject.asObservable();
  }

  update(selectedExpenseItem: ExpenseItem): void {
    this.selectedExpenseItemSubject.next(selectedExpenseItem);
  }
}
