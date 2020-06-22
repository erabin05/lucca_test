import { Directive, SimpleChanges, OnChanges, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAmountInput]'
})
export class AmountInputDirective implements OnChanges {
  @Input('appAmountInput') value;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.value.currentValue);
  }

}
