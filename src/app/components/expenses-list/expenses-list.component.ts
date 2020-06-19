import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenseItemsCount: number;
  expenseItems: ExpenseItem[];

  constructor(
    public expensesService: ExpensesService,
    public paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.getExpenseItemsToDisplay();
    this.expensesService
      .getCountOfAllExpenseItems()
      .subscribe((count: number) => { this.expenseItemsCount = count; });
  }

  getExpenseItemsToDisplay() {
    this.expensesService
      .getExpenseItems()
      .subscribe((data: ExpenseItem[]) => {
        this.expenseItems = data;
      });
    this.expensesService
      .loadExpenseItemsInPage();
  }
}
