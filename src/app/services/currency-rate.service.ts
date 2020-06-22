import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CurrencyRateList, CurrencyRate } from '../entities/currency-rate';

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
  selectedRate = new BehaviorSubject<number>(1);

  updateSelectedRate(currency: string, date: string): void {
    this.currencyRateLists
          .asObservable()
          .subscribe((rateLists: CurrencyRateList[]) => {
            // if () {
            //   rateLists.filter((rateList) => rateList.date === date)
            // } else {
            //   // load
            // }

          });
  }

  loadCurrencyRateAtDate(date: string): void {
    this.http
        .get(`${this.url}${date}`)
        .subscribe((data: any) => {
          let currencyRateList;
          this.currencyRateLists
            .asObservable()
            .subscribe((rateLists) => {
              currencyRateList = rateLists;
            });
          currencyRateList.next([
              ...currencyRateList,
              this.sortAlowedCurrencys(
                this.transformDataApi(data)
              )
            ]);
        });
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


 // convertInEuro(amount: Amount, date: string): Observable<Amount> {
  //   const currency = 'EUR';
  //   let loadedCurrencyRateList: CurrencyRateList[];
  //   this.currencyRateList
  //     .asObservable()
  //     .subscribe((rates: CurrencyRateList[]) => {
  //       loadedCurrencyRateList = rates;
  //     });

  //   const other = loadedCurrencyRateList.filter((rate: CurrencyRateList) => rate.date === date);
  //   if (other.length > 0) {
  //     return of({
  //       amount : amount.amount / this.findCurrencyRate(amount, loadedCurrencyRateList),
  //       currency
  //     });
  //   } else {
  //     const url = `https://api.exchangeratesapi.io/${date}`;
  //     this.http
  //       .get(url)
  //       .pipe(
  //         map((data: any) => {
  //           const newCurrencyRateList = [
  //             ... loadedCurrencyRateList,
  //             this.sortAlowedCurrencys(
  //               this.transformDataApi(data)
  //             )
  //           ];
  //           this.currencyRateList.next(newCurrencyRateList);
  //           return {
  //             amount : amount.amount / this.findCurrencyRate(amount, loadedCurrencyRateList),
  //             currency
  //           };
  //         })
  //       );
  //   }
  // }


  // private findCurrencyRate(amount: Amount, currencyRateList: CurrencyRateList[]): number {
  //   return currencyRateList[0]
  //             .rates
  //             .reduce((acc, rate) => rate.currency === amount.currency ? rate.rate : acc, 0);
  // }
