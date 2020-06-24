import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';

@Directive({
  selector: '[appDateInput]'
})
export class DateInputDirective implements OnChanges {
  @Input() appValue;

  constructor(
    private currencyRateService: CurrencyRateService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.currencyRateService.loadCurrencyRateAtDate(changes.appValue.currentValue);
  }
}
