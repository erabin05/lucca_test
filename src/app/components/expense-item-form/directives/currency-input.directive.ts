import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCurrencyInput]'
})
export class CurrencyInputDirective implements OnChanges {

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.value.currentValue);
  }

}
