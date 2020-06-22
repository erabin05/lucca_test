import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';

@Directive({
  selector: '[appCurrencyInput]'
})
export class CurrencyInputDirective implements OnChanges {
  @Input('appCurrencyInput') value;

  constructor(
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.value.currentValue)

  }

}
