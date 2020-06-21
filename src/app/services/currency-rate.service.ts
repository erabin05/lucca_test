import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Amount } from '../entities/expense-item';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  currencys = ['CHF', 'EUR', 'GBP', 'USD'];
  currencyRates = new BehaviorSubject<object[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  loadCurrencyRates(date?: string): void {
    const url = `https://api.exchangeratesapi.io/${date ? date : this.currentDate()}`;
    this.http
      .get(`https://api.exchangeratesapi.io/2010-01-12`)
      .subscribe((data: any) =>  {
        this.currencyRates
          .next(
            this.sortAlowedCurrencys(
              this.currencyRatesObjectToArray(data.rates)
            )
          );
      });
  }

 currentDate() {
   const date = new Date();
   return `${date.getFullYear}-${date.getMonth()}-${date.getDay()}`;
 }

  private currencyRatesObjectToArray(rates: any): any[] {
    let ratesinArray = [];
    for (const rate in rates) {
      if (rates.hasOwnProperty(rate)) {
        ratesinArray = [ ... ratesinArray, { currency: rate, rate : rates[rate]}];
      }
    }
    return ratesinArray;
  }

  private sortAlowedCurrencys(rates: any[]): object[] {
    return  rates.filter((rate) => {
      return this.currencys.filter((currency) => rate.currency === currency).length > 0;
    });
  }

  convertInEuro(amount: Amount): Amount {
    let currencyRate: number;
    this.currencyRates
      .asObservable()
      .subscribe((currencyRates: any) => {
        currencyRate = currencyRates.reduce((acc, rate) => {
          return amount.currency ===  rate.currency ? rate.rate : acc;
        });
      });
    return {
      amount : amount.amount / currencyRate,
      currency : 'EUR'
    };
  }
}
