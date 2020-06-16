import { Component, OnInit, Input } from '@angular/core';
import { ExpenseItem } from 'src/app/entities/expense-item';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {
  @Input() expenseItem: ExpenseItem;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
