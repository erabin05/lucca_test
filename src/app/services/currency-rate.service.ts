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

  getselectedDate(): Observable<string> {
    return this.selectedDate.asObservable();
  }

  convertInEuro(amount?: number): void {
    let selectedRate: CurrencyRate;
    this.selectedRate
              .asObservable()
              .subscribe((rate) => {
                selectedRate = rate;
              });
    if (selectedRate) {
      this.convertedAmount.next(new Amount(amount / selectedRate.rate, 'EUR'));
    }
  }

  selectRateOfCurrency(currency?: string): void {
    let selectedDate: string;
    this.selectedDate
              .asObservable()
              .subscribe((date) => selectedDate = date);
    if (currency !== 'EUR') {
      let selectedRate: CurrencyRate;
      this.currencyRateLists
          .asObservable()
          .subscribe((lists: CurrencyRateList[]) => {
            if (lists.length > 0) {
              const RatesAtDate = lists.reduce((acc, list) => list.date === selectedDate ? list : acc);
              selectedRate = RatesAtDate.rates.reduce((acc, rate) => rate.currency === currency ? rate : acc);
            }
          });
      this.selectedRate.next(selectedRate);
    } else {
      this.selectedRate.next(new CurrencyRate());
    }
  }

  loadCurrencyRateAtDate(date?: string): void {
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
