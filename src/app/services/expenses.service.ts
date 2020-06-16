import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private url = '/api/expenseItems';

  constructor(
    private http: HttpClient
  ) { }

  getAllExpenses(): Observable<any> {
    return this.http.get(this.url);
  }

  getAllExpensesFromTo(start: number, end: number): Observable<any> {
    return this.http.get(`${this.url}?offset=${start}&limit=${end - start}`);
  }
}
