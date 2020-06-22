import { Directive, SimpleChanges, OnChanges, Input} from '@angular/core';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';

@Directive({
  selector: '[appAmountInput]'
})
export class AmountInputDirective implements OnChanges {
  @Input('appAmountInput') value;

  constructor(
    private currencyRateService: CurrencyRateService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currencyRateService.convertInEuro(changes.value.currentValue);
  }
}
