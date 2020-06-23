import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { PaginationService } from 'src/app/services/pagination.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenseItemsCount: number;
  expenseItems: ExpenseItem[];
  pagination: any;
  numberOfPage: number; // = Math.floor(this.expenseItemsCount / this.pagination.numberOfItemsDisplayed);

  constructor(
    public expensesService: ExpensesService,
    public paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.getExpenseItemsToDisplay();
    this.getCountofAllExpensesItemAndPagination();
  }

  getExpenseItemsToDisplay() {
    this.expensesService
      .loadExpenseItemsInPage();
    this.expensesService
      .getExpenseItems()
      .subscribe((data: ExpenseItem[]) => {
        this.expenseItems = data;
      });
  }

  getCountofAllExpensesItemAndPagination() {
    this.expensesService
      .loadCountOfAllExpenseItems();
    this.expensesService
      .getCountOfAllExpenseItems()
      .pipe(
        mergeMap(
          (count: number) => {
            this.expenseItemsCount = count;
            return this.paginationService.getPagination()
        })
      )
      .subscribe((pagination: any) => {
        this.pagination = pagination;
        this.numberOfPage = Math.ceil(this.expenseItemsCount / pagination.numberOfItemsDisplayed);
      });
  }
}
