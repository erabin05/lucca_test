import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { SelectedExpenseItemService } from 'src/app/services/selected-expense-item.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenseItems: ExpenseItem[];
  expenseItemsCount: number;

  firstItemDisplayedIndex = 0;
  numberOfItemsDisplayed = 12;

  constructor(
    private expensesService: ExpensesService,
    private selectedExpenseItemService: SelectedExpenseItemService
  ) {}

  ngOnInit() {
    this.getExpenseItemsToDisplay();
    this.expensesService.getCountOfAllExpenseItems()
      .subscribe((data) => {
        this.expenseItemsCount = data;
      });

  }

  getExpenseItemsToDisplay() {
    this.expensesService
      .getExpenseItemsFromTo(
          this.firstItemDisplayedIndex,
          this.firstItemDisplayedIndex + this.numberOfItemsDisplayed
      )
      .subscribe((data) => {
        this.expenseItems = data;
        this.selectedExpenseItemService.update(data[0]);
      });
  }

  goToNextPage() {
    this.firstItemDisplayedIndex += this.numberOfItemsDisplayed;
    this.getExpenseItemsToDisplay();
  }

  goToPreviousPage() {
    this.firstItemDisplayedIndex -= this.numberOfItemsDisplayed;
    this.getExpenseItemsToDisplay();
  }
}
