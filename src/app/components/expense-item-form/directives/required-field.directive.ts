import { Directive, OnChanges, OnInit, Input, SimpleChanges, ElementRef } from '@angular/core';
import { RequieredFieldsService } from 'src/app/services/requiered-fields.service';

@Directive({
  selector: '[appRequiredField]'
})
export class RequiredFieldDirective implements OnChanges {
  @Input('appRequiredField') type: string;
  @Input() appValue: string;

  constructor(
    private el: ElementRef,
    private requierdFieldService: RequieredFieldsService
    ) {
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
        this.redSignIf(!currentValue || currentValue === '');
        break;
      case 'amount':
        this.redSignIf(!currentValue || currentValue === 0);
        break;
    }
  }

  redSignIf(condition: boolean) {
    const className = this.el.nativeElement.className;
    if (condition) {
      this.requierdFieldService.changeField(this.type, false);
      if (!className.includes('selected')) {
        this.el.nativeElement.className = `${className} selected`;
      }
    } else {
      this.requierdFieldService.changeField(this.type, true);
      this.el.nativeElement.className = className.replace('selected', '');
    }
  }
}
