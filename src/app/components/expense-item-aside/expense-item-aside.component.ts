import { Component, OnInit } from '@angular/core';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';
import { AsideStatusService } from 'src/app/services/aside-status.service';

@Component({
  selector: 'app-expense-item-aside',
  templateUrl: './expense-item-aside.component.html',
  styleUrls: ['./expense-item-aside.component.scss']
})
export class ExpenseItemAsideComponent implements OnInit {
  expenseItem: ExpenseItem;

  SEE = this.asideStatusService.SEE;
  CREATE = this.asideStatusService.CREATE;
  MODIFIE = this.asideStatusService.MODIFIE;

  constructor(
    private expensesService: ExpensesService,
    private asideStatusService: AsideStatusService
  ) { }

  ngOnInit() {
    this.expensesService.getSelectedExpenseItem()
      .subscribe((data: ExpenseItem) => {
        this.expenseItem = data;
      });
  }
}
