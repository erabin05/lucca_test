import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Amount } from '../entities/expense-item';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  currencys = ['CHF', 'EUR', 'GBP', 'USD'];

  constructor(
    private http: HttpClient
  ) { }

  convertInEuro(amount: Amount, expenseDate: string): Observable<Amount> {
    return this.http.get(`https://api.exchangeratesapi.io/2010-01-12`).pipe(
      map((data: any) => {
        return {
          amount: 0,
          currency: ''
        };
      })
    );
  }
}
