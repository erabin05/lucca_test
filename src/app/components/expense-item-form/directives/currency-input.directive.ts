import { Directive, Input, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';
import { CurrencyRateList } from 'src/app/entities/currency-rate';

@Directive({
  selector: '[appCurrencyInput]'
})
export class CurrencyInputDirective implements OnChanges, OnInit {
  @Input('appCurrencyInput') value;
  currencyRateLists: CurrencyRateList[];
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
        });
    this.currencyRateService
        .getCurrencyRateLists()
        .subscribe((lists) => {
          this.currencyRateLists = lists;
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currencyRateService.selectRateOfCurrency(changes.value.currentValue);
  }
}
