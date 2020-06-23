import { Directive, Input, HostListener, OnInit, ElementRef, OnChanges } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseItem } from 'src/app/entities/expense-item';

@Directive({
  selector: '[appPageButton]'
})
export class PageButtonDirective implements OnInit, OnChanges {
  @Input('appPageButton') direction: string;
  @Input() pagination: object;
  expenseItemsCount: number;
  el: ElementRef;


  constructor(
    el: ElementRef,
    private paginationService: PaginationService,
    private expensesService: ExpensesService
  ) {
    this.el = el;
  }

  ngOnInit() {
    this.getCountofAllExpensesItem();
  }

  getCountofAllExpensesItem() {
    this.expensesService
      .loadCountOfAllExpenseItems();
    this.expensesService
      .getCountOfAllExpenseItems()
      .subscribe((count: number) => { this.expenseItemsCount = count; });
  }

  ngOnChanges() {
    if (this.direction === 'PREVIOUS') {
      this.changeOpacityIf(this.paginationService.isFirstPage());
    }
    if (this.direction === 'NEXT') {
      this.changeOpacityIf(this.paginationService.isLastpage(this.expenseItemsCount));
    }
  }

  changeOpacityIf(condition: boolean): void {
    if (condition) {
      this.el.nativeElement.style.opacity = '0.5';
    } else {
      this.el.nativeElement.style.opacity = '1';
    }
  }

  @HostListener('click')
  changePage() {
    if (this.direction === 'PREVIOUS') {
      if (!this.paginationService.isFirstPage()) {
        this.paginationService.goToPreviousPage();
      }

    }
    if (this.direction === 'NEXT') {
      if (!this.paginationService.isLastpage(this.expenseItemsCount)) {
        this.paginationService.goToNextPage();
      }
    }
  }
}
