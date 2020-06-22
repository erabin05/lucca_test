import { Directive, SimpleChanges, OnChanges, HostListener, Input, OnInit } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';
import { CurrencyRateList, CurrencyRate } from 'src/app/entities/currency-rate';

@Directive({
  selector: '[appAmountInput]'
})
export class AmountInputDirective implements OnChanges, OnInit {
  @Input('appAmountInput') value;
  selectedDate: CurrencyRate;

  constructor(
    private currencyRateService: CurrencyRateService
  ) {
  }

  ngOnInit() {
    this.currencyRateService
        .getselectedRate()
        .subscribe((rate) => {
          this.selectedDate = rate;
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currencyRateService.convertInEuro(changes.value.currentValue);
  }
}
