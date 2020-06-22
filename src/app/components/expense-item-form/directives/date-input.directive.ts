import { Directive, Input, OnChanges, ElementRef, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDateInput]'
})
export class DateInputDirective implements OnChanges, OnInit{
  @Input('appDateInput') value;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.value.currentValue)
  }
}
