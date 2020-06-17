import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { SelectedExpenseItemService } from 'src/app/services/selected-expense-item.service';
import { ExpenseItem } from 'src/app/entities/expense-item';

@Directive({
  selector: '[appSelectItem]'
})
export class SelectItemDirective {
  @Input('appSelectItem') selectedItem: ExpenseItem;

  constructor(
    private selectedExpenseItemService: SelectedExpenseItemService,
    private el: ElementRef
  ) { }

  @HostListener('click') select() {
    this.selectedExpenseItemService.update(this.selectedItem);
  }

}
