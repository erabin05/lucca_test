import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { CurrencyRateList, CurrencyRate } from '../entities/currency-rate';
import { Amount } from '../entities/expense-item';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  constructor(
    private http: HttpClient
  ) { }

  url = 'https://api.exchangeratesapi.io/';
  currencys = ['CHF', 'EUR', 'GBP', 'USD'];
  currencyRateLists = new BehaviorSubject<CurrencyRateList[]>([]);
  selectedDate = new BehaviorSubject<string>('');
  selectedCurrency = new BehaviorSubject<string>('');
  selectedRate = new BehaviorSubject<CurrencyRate>(new CurrencyRate());
  convertedAmount = new BehaviorSubject<Amount>(new Amount());

  getConvertedAmount(): Observable<Amount> {
    return this.convertedAmount.asObservable();
  }

  convertInEuro(amount?: number): void {
    this.selectedRate
              .asObservable()
              .subscribe((rate) => {
                if (rate) {
                  this.convertedAmount.next(new Amount(this.roundConvertedAmount(amount / rate.rate), 'EUR'));
                }
              });
  }

  private roundConvertedAmount(amount: number): number {
    return Math.floor(amount * 100) / 100;
  }

  selectRateOfCurrency(currency?: string): void {
    let selectedDate: string;
    this.selectedDate
              .asObservable()
              .subscribe((date) => selectedDate = date);
    if (currency !== 'EUR') {
      this.currencyRateLists
          .asObservable()
          .subscribe((lists: CurrencyRateList[]) => {
            if (lists.length > 0) {
              const RatesAtDate = lists.reduce((acc, list) => list.date === selectedDate ? list : acc);
              const selectedRate = RatesAtDate.rates.reduce((acc, rate) => rate.currency === currency ? rate : acc);
              this.selectedRate.next(selectedRate);
            }
          });
    } else {
      this.selectedRate.next(new CurrencyRate());
    }
  }

  loadCurrencyRateAtDate(date: string): void {
    if (date) {
      this.selectedDate.next(date);
      let currencyRateLists: CurrencyRateList[];
      this.currencyRateLists
        .asObservable()
        .subscribe((rateLists) => {
          currencyRateLists = rateLists;
        });
      const isAlreadyInList = currencyRateLists.filter((list) => list.date === date).length > 0;
      if (!isAlreadyInList) {
        let currencyRateListAPI: CurrencyRateList;
        this.http
            .get(`${this.url}${date}`)
            .subscribe((data: any) => {
              currencyRateListAPI = this.sortAlowedCurrencys( this.transformDataApi(data) );
              this.currencyRateLists.next([
                ...currencyRateLists,
                currencyRateListAPI
              ]);
            });
    }
    }

  }

  private transformDataApi(data: CurrencyRateList): CurrencyRateList {
    let ratesinArray = [];
    for (const rate in data.rates) {
      if (data.rates.hasOwnProperty(rate)) {
        ratesinArray = [ ... ratesinArray, { currency: rate, rate : data.rates[rate]}];
      }
    }
    return {
      rates : ratesinArray,
      date: data.date
    };
  }

  private sortAlowedCurrencys(data: any): CurrencyRateList {
    return  {
      ... data,
      rates : data.rates.filter((rate) => {
        return this.currencys.filter((currency) => rate.currency === currency).length > 0;
      })
    };
  }
}
