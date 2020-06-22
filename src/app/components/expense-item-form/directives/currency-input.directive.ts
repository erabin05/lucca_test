import { Directive, Input, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';

@Directive({
  selector: '[appCurrencyInput]'
})
export class CurrencyInputDirective implements OnChanges, OnInit {
  @Input('appCurrencyInput') value;
  date: string;

  constructor(
    private currencyRateService: CurrencyRateService
  ) {
  }

  ngOnInit() {
    this.currencyRateService
        .getselectedDate()
        .subscribe((date) => {
          this.date = date;
          this.currencyRateService.selectRateOfCurrency(this.value);
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currencyRateService.selectRateOfCurrency(changes.value.currentValue);
  }
}
