import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Amount } from '../entities/expense-item';
import { CurrencyRates, CurrencyRate } from '../entities/currency-rate';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  constructor(
    private http: HttpClient
  ) { }

  currencys = ['CHF', 'EUR', 'GBP', 'USD'];
  currencyRates = new BehaviorSubject<object[]>([]);

  // loadCurrencyRates(date?: string): void {
  //   const url = `https://api.exchangeratesapi.io/${date ? date : this.currentDate()}`;
  //   this.http
  //     .get(url)
  //     .subscribe((data: any) =>  {
  //         let currencyRates;
  //         this.currencyRates
  //           .asObservable()
  //           .subscribe((rates) => {
  //             currencyRates = rates;
  //           });
  //         this.currencyRates
  //           .next(
  //             [
  //               ... currencyRates,
  //               this.sortAlowedCurrencys(
  //                 this.transformDataApi(data)
  //               )
  //             ]
  //           );
  //     });
  // }

  private transformDataApi(data: CurrencyRates): CurrencyRates {
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

  private sortAlowedCurrencys(data: any): CurrencyRates {
    return  {
      ... data,
      rates : data.rates.filter((rate) => {
        return this.currencys.filter((currency) => rate.currency === currency).length > 0;
      })
    };
  }

  // convertInEuro(amount: Amount): Amount {
  //   let currencyRate: number;
  //   this.currencyRates
  //     .asObservable()
  //     .subscribe((currencyRates: any) => {
  //       currencyRate = currencyRates.reduce((acc, rate) => {
  //         return amount.currency ===  rate.currency ? rate.rate : acc;
  //       });
  //     });
  //   return {
  //     amount : amount.amount / currencyRate,
  //     currency : 'EUR'
  //   };
  // }

  convertInEuro(amount: Amount, date: string): Observable<Amount> {
    const currency = 'EUR';
    let loadedCurrencyRates: CurrencyRates[];
    this.currencyRates
      .asObservable()
      .subscribe((rates: CurrencyRates[]) => {
        loadedCurrencyRates = rates;
      });

    const other = loadedCurrencyRates.filter((rate: CurrencyRates) => rate.date === date);
    if (other.length > 0) {
      return of({
        amount : amount.amount / this.findCurrencyRate(amount, loadedCurrencyRates),
        currency
      });
    } else {
      const url = `https://api.exchangeratesapi.io/${date}`;
      this.http
        .get(url)
        .pipe(
          map((data: any) => {
            const newCurrencyRates = [
              ... loadedCurrencyRates,
              this.sortAlowedCurrencys(
                this.transformDataApi(data)
              )
            ];
            this.currencyRates.next(newCurrencyRates);
            return {
              amount : amount.amount / this.findCurrencyRate(amount, loadedCurrencyRates),
              currency
            };
          })
        );
    }
  }


  private findCurrencyRate(amount: Amount, currencyRates: CurrencyRates[]): number {
    return currencyRates[0]
              .rates
              .reduce((acc, rate) => rate.currency === amount.currency ? rate.rate : acc, 0);
  }

}
