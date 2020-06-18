import { Component, OnInit } from '@angular/core';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-expense-item-aside',
  templateUrl: './expense-item-aside.component.html',
  styleUrls: ['./expense-item-aside.component.scss']
})
export class ExpenseItemAsideComponent implements OnInit {
  expenseItem: ExpenseItem;

  constructor(
    private expensesService: ExpensesService
  ) { }

  ngOnInit() {
    this.expensesService.getSelectedExpenseItem()
      .subscribe((data: ExpenseItem) => {
        this.expenseItem = data;
      });
  }
}
