import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

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
