import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseItem } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-expense-item-form',
  templateUrl: './expense-item-form.component.html',
  styleUrls: ['./expense-item-form.component.scss']
})
export class ExpenseItemFormComponent implements OnInit {

  expenseItemForm: FormGroup;
  expenseItem = new ExpenseItem();

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService
  ) { }

  ngOnInit() {
    this.expenseItemForm = this.formBuilder.group(this.expenseItem.form());
  }

  submitForm() {
    console.log(this.expenseItemForm.value);
    this.expensesService
      .postExpenseItem(this.expenseItem.submitForm(this.expenseItemForm.value));

  }

}
