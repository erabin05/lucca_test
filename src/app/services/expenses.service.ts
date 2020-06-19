import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { ExpenseItem, ExpenseItemForm } from '../entities/expense-item';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expenseItemsSubject = new Subject<ExpenseItem[]>();
  private expenseItems: ExpenseItem[];
  private initialSelectedItem = new ExpenseItem();
  private selectedExpenseItemSubject = new BehaviorSubject<ExpenseItem>(this.initialSelectedItem);
  private url = '/api/expenseItems';

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) { }

  getCountOfAllExpenseItems(): Observable<number> {
    return this.http.get(this.url)
              .pipe(
                map((data: any) => data.count)
              );
  }

  loadExpenseItemsInPage(): void {
    this.paginationService.getPagination().subscribe((currentP: any) => {
      this.http
        .get(`${this.url}?offset=${currentP.firstItemDisplayedIndex}&limit=${currentP.numberOfItemsDisplayed}`)
        .subscribe((data: any) => {
          this.expenseItemsSubject.next(
            data.items.map((item, i) => ({ ...item, selected : i === 0}))
          );
          this.selectedExpenseItemSubject.next(data.items[0]);
          this.expenseItems = data.items;
      });
    });
  }

  getExpenseItems(): Observable<ExpenseItem[]> {
    return this.expenseItemsSubject.asObservable();
  }

  selectExpenseItem(selectedExpenseItem: ExpenseItem): void {
    this.selectedExpenseItemSubject.next(selectedExpenseItem);
    this.expenseItemsSubject.next(
      this.expenseItems.map(item => ({ ...item, selected: selectedExpenseItem.id === item.id}))
    );
  }

  getSelectedExpenseItem(): Observable<ExpenseItem> {
    return this.selectedExpenseItemSubject.asObservable();
  }

  postExpenseItem(newExpenseItemForm: ExpenseItemForm): Observable<any> {
    if (this.isRequieredFieldFilled(newExpenseItemForm)) {
      return this.http.post(this.url, newExpenseItemForm.toExpenseItem());
    } else {
      return throwError(new Error (`Fill in the requiered fields`));
    }
  }

  putExpenseItem(updatedExpenseItemForm: ExpenseItemForm): Observable<any> {
    if (this.isRequieredFieldFilled(updatedExpenseItemForm)) {
      return this.http.put(`${this.url}/${updatedExpenseItemForm.id}`, updatedExpenseItemForm.toExpenseItem());
    } else {
      return throwError(new Error (`Fill in the requiered fields`));
    }
  }

  isRequieredFieldFilled(expenseItemForm: ExpenseItemForm): boolean {
    const nonOptionalInputs = [
      'purchasedOn',
      'nature',
      'originalAmount',
      'originalAmountCurrency'
     ];

    return  nonOptionalInputs.filter(controlName => {
        if (typeof expenseItemForm[controlName] === 'string') {
          return expenseItemForm[controlName] && expenseItemForm[controlName].length > 0 ;
        }
        return expenseItemForm[controlName];
      }).length ===  nonOptionalInputs.length;
  }
}
