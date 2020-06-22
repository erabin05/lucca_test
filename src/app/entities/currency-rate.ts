export class CurrencyRate {
  constructor() {
    this.rate = 1;
    this.currency = 'EUR';
  }
  rate: number;
  currency: string;
}

export class CurrencyRateList {
  date: string;
  rates: CurrencyRate[];
}
