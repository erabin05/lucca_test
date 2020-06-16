import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseItem } from 'src/app/entities/expense-item';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenseItems: ExpenseItem[];

  firstItemDisplayedIndex = 0;
  numberOfItemsDisplayed = 5;

  constructor(
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.expensesService
      .getExpenseItemsFromTo(
          this.firstItemDisplayedIndex,
          this.firstItemDisplayedIndex + this.numberOfItemsDisplayed
      )
      .subscribe((data) => {
        this.expenseItems = data.items;
      });
  }

  goToNextPage() {
    this.firstItemDisplayedIndex += this.numberOfItemsDisplayed;
    this.ngOnInit();
  }

  goToPreviousPage() {
    this.firstItemDisplayedIndex -= this.numberOfItemsDisplayed;
    this.ngOnInit();
  }

}
