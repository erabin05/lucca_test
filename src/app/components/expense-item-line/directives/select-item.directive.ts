import { Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core';
import { SelectedExpenseItemService } from 'src/app/services/selected-expense-item.service';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appSelectItem]'
})
export class SelectItemDirective {
  @Input('appSelectItem') currentItem: ExpenseItem;

  constructor(
    private selectedExpenseItemService: SelectedExpenseItemService,
    private el: ElementRef
  ) { }

  @HostListener('click') select() {
    this.selectedExpenseItemService.update(this.currentItem);
  }

}
