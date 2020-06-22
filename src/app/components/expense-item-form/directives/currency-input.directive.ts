import { Directive, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';

@Directive({
  selector: '[appCurrencyInput]'
})
export class CurrencyInputDirective implements OnChanges {
  @Input('appCurrencyInput') value;
  date: string;

  constructor(
    private currencyRateService: CurrencyRateService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currencyRateService.selectRateOfCurrency(changes.value.currentValue);
  }
}
