import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ExpenseItem } from '../entities/expense-item';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expenseItemsSubject = new Subject<ExpenseItem[]>();
  private url = '/api/expenseItems';

  constructor(
    private http: HttpClient
  ) { }

  getCountOfAllExpenseItems(): Observable<number> {
    return this.http.get(this.url)
              .pipe(
                map((data: any) => data.count)
              );
  }

  loadExpenseItemsFromTo(start: number, end: number): void {
        this.http
          .get(`${this.url}?offset=${start}&limit=${end - start}`)
          .subscribe((data: any) => {
            this.expenseItemsSubject.next(data.items);
          });
  }

  getExpenseItems(): Observable<ExpenseItem[]> {
    return this.expenseItemsSubject.asObservable();
  }

}
