import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseItem, ExpenseItemForm } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';
import { AsideStatusService } from 'src/app/services/aside-status.service';

@Component({
  selector: 'app-expense-item-form',
  templateUrl: './expense-item-form.component.html',
  styleUrls: ['./expense-item-form.component.scss']
})
export class ExpenseItemFormComponent implements OnInit {

  expenseItemFormGroup: FormGroup;
  expenseItem = new ExpenseItemForm();
  nonOptionalInputs = [
    'purchasedOn',
    'nature',
    'originalAmount',
    'originalAmountCurrency'
   ];

  SEE = this.asideStatusService.SEE;
  CREATE = this.asideStatusService.CREATE;
  MODIFIE = this.asideStatusService.MODIFIE;

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService,
    public currencyRateService: CurrencyRateService,
    private asideStatusService: AsideStatusService
  ) { }

  ngOnInit() {
    this.expenseItemFormGroup = this.formBuilder.group(this.expenseItem);
  }

  submitForm() {
    if (this.isInputsfilled(this.nonOptionalInputs, this.expenseItemFormGroup.value)) {
      this.expensesService
      .postExpenseItem(this.expenseItem.toExpenseItem(this.expenseItemFormGroup));
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
