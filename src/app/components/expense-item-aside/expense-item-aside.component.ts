import { Component, OnInit } from '@angular/core';
import { SelectedExpenseItemService } from 'src/app/services/selected-expense-item.service';
import { ExpenseItem } from 'src/app/entities/expense-item';

@Component({
  selector: 'app-expense-item-aside',
  templateUrl: './expense-item-aside.component.html',
  styleUrls: ['./expense-item-aside.component.scss']
})
export class ExpenseItemAsideComponent implements OnInit {
  expenseItem: ExpenseItem;

  constructor(
    private selectedExpenseItemService: SelectedExpenseItemService
  ) { }

  ngOnInit() {
    this.selectedExpenseItemService.get()
      .subscribe((data: ExpenseItem) => {
        console.log(data);
        this.expenseItem = data;
      });
  }

}
