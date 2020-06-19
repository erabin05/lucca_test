import { Directive, Input, HostListener, OnInit } from '@angular/core';
import { AsideStatusService } from 'src/app/services/aside-status.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { PaginationService } from 'src/app/services/pagination.service';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit {
  @Input('appButton') status: string;
  @Input() buttonPurpose: string;


  SEE = this.asideStatusService.SEE;
  CREATE = this.asideStatusService.CREATE;
  MODIFIE = this.asideStatusService.MODIFIE;

  selectedExpenseItem: ExpenseItem;
  expenseItems: ExpenseItem[];

  constructor(
    private asideStatusService: AsideStatusService,
    private expenseService: ExpensesService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.expenseService
      .getSelectedExpenseItem()
      .subscribe((item) => {
        this.selectedExpenseItem = item;
      });
    this.expenseService
      .getExpenseItems()
      .subscribe((expenseItems) => {
        this.expenseItems = expenseItems;
      });
  }

  @HostListener('click')
  transition() {
    switch (this.status) {
      case this.SEE:
        this.asideStatusService.toSEE();
        this.expenseService.loadExpenseItemsInPage();
        break;
      case this.CREATE:
        this.asideStatusService.toCREATE();
        break;
      case this.MODIFIE:
        this.asideStatusService.toMODIFIE();
        break;
    }

    switch (this.buttonPurpose) {
      case 'DELETE':
        this.expenseService
            .deleteExpense(this.selectedExpenseItem.id)
            .subscribe(() => {
              this.expenseService.loadExpenseItemsInPage();
              this.expenseService.loadCountOfAllExpenseItems();
            });
        break;
    }
  }
}
