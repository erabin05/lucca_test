export class CurrencyRate {
  rate: number;
  currency: string;
}

export class CurrencyRateList {
  date: string;
  rates: CurrencyRate[];
}
