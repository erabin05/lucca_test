import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {

  constructor(
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.expensesService.getAllExpenses().subscribe(data => console.log(data));
  }

}
