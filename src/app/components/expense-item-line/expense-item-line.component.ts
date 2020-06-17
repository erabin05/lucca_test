import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ExpenseItem } from 'src/app/entities/expense-item';

@Component({
  selector: 'app-expense-item-line',
  templateUrl: './expense-item-line.component.html',
  styleUrls: ['./expense-item-line.component.scss']
})
export class ExpenseItemLineComponent implements OnInit {
  @Input() expenseItem: ExpenseItem;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
