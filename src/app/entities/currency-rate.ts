export class CurrencyRate {
  rate: number;
  currency: string;
}

export class CurrencyRates {
  date: string;
  rates: CurrencyRate[];
}
