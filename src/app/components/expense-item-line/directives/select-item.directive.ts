import { Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';

@Directive({
  selector: '[appSelectItem]'
})
export class SelectItemDirective {
  @Input('appSelectItem') currentItem: ExpenseItem;

  constructor(
    private expenseService: ExpensesService,
    private el: ElementRef
  ) { }

  @HostListener('click') select() {
    this.expenseService.selectExpenseItem(this.currentItem);
  }
}
