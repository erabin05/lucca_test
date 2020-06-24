import { Directive, OnChanges, OnInit, Input, SimpleChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRequiredField]'
})
export class RequiredFieldDirective implements OnChanges {
  @Input('appRequiredField') type: string;
  @Input() appValue: string;
  el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentValue = changes.appValue.currentValue;
    switch (this.type) {
      case 'date':
        const today = new Date();
        const selectedDate = new Date(currentValue);
        this.redSignIf(selectedDate > today);
        break;
      case 'nature':
        this.redSignIf(!currentValue && currentValue === '');
        break;
      case 'amount':
        this.redSignIf(currentValue === 0);
        break;
    }
  }

  redSignIf(condition: boolean) {
    const className = this.el.nativeElement.className;
    if (condition) {
      if (!className.includes('selected')) {
        this.el.nativeElement.className = `${className} selected`;
      }
    } else {
      this.el.nativeElement.className = className.replace('selected', '');
    }
  }
}
