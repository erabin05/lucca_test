import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExpenseItem } from '../entities/expense-item';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

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

  getExpenseItemsFromTo(start: number, end: number): Observable<ExpenseItem[]> {
    return this.http.get(`${this.url}?offset=${start}&limit=${end - start}`)
              .pipe(
                map((data: any) => data.items)
              );
  }
}
