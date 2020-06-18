import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseItem, ExpenseItemForm } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-expense-item-form',
  templateUrl: './expense-item-form.component.html',
  styleUrls: ['./expense-item-form.component.scss']
})
export class ExpenseItemFormComponent implements OnInit {

  expenseItemForm: FormGroup;
  expenseItem = new ExpenseItem();
  nonOptionalInputs = [
    'purchasedOn',
    'nature',
    'originalAmount',
    'originalAmountCurrency'
   ];

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService
  ) { }

  ngOnInit() {
    this.expenseItemForm = this.formBuilder.group(this.expenseItem.form());
  }

  submitForm() {
    if (this.isInputsfilled(this.nonOptionalInputs, this.expenseItemForm.value)) {
      this.expensesService
      .postExpenseItem(this.expenseItem.submitForm(this.expenseItemForm.value));
    } else {
      throw new Error(`Fill in the requiered fields : ${this.nonOptionalInputs.reduce((acc, value) => acc + ' ' + value, '')}`);
    }
  }

  isInputsfilled(controlNames: string[], expenseItemForm: ExpenseItemForm): boolean {
    return controlNames.filter(controlName => {
        if (typeof expenseItemForm[controlName] === 'string') {
          return expenseItemForm[controlName] && expenseItemForm[controlName].length > 0 ;
        }
        return expenseItemForm[controlName];
      }).length === controlNames.length;
  }

}
