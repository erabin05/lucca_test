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
  private countOfAllexpensesItem = new BehaviorSubject<number>(0);
  private url = '/api/expenseItems';

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) { }

  loadCountOfAllExpenseItems(): void {
    console.log('yo')
    this.http
          .get(this.url)
          .subscribe((data: any) => {
            this.countOfAllexpensesItem.next(data.count);
          });
  }

  getCountOfAllExpenseItems(): Observable<number> {
    return this.countOfAllexpensesItem.asObservable();
  }

  loadExpenseItemsInPage(): void {
    this.paginationService.getPagination().subscribe((currentP: any) => {
      this.http
        .get(`${this.url}?offset=${currentP.firstItemDisplayedIndex}&limit=${currentP.numberOfItemsDisplayed}`)
        .subscribe((data: any) => {
          let selectionIndex;

          this.passSelectedItem((selectedItem: ExpenseItem) => {
              selectionIndex = data.items.reduce((acc, item, i) => selectedItem.id === item.id ? i : acc, 0);
              this.expenseItemsSubject.next(
                data.items.map((item, i) => {
                  return { ...item, selected : i === selectionIndex};
                })
              );
              this.expenseItems = data.items;
            }
          );
          this.selectedExpenseItemSubject.next(data.items[selectionIndex]);
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

  private passSelectedItem(method: (selectedItem: ExpenseItem) => void): void {
    this.getSelectedExpenseItem()
        .subscribe((selectedItem) => {
          method(selectedItem);
        });
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

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
