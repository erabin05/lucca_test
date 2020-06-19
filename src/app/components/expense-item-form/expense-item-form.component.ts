import { Component, OnInit, Input } from '@angular/core';
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
  @Input() toUpdate?: boolean;

  expenseItemFormGroup: FormGroup;
  expenseItem = new ExpenseItemForm();

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
    this.initiateExpenseItemForm();
  }

  submitForm() {
    if (this.toUpdate) {
      this.expensesService
        .putExpenseItem(this.expenseItemFormGroup.value)
        .subscribe(res => {
          console.log(res);
          this.expensesService.loadExpenseItemsInPage();
        });
    } else {
      this.expensesService
        .postExpenseItem(this.expenseItemFormGroup.value)
        .subscribe(res => {
          console.log(res);
          this.expensesService.loadExpenseItemsInPage();
        });
    }
    this.asideStatusService.toSEE();
  }

  initiateExpenseItemForm() {
    if (this.toUpdate) {
      this.expensesService.getSelectedExpenseItem().subscribe((item) => {
        this.expenseItem = new ExpenseItemForm(item);
        this.expenseItemFormGroup = this.formBuilder.group(this.expenseItem);
      });
    }
  }

}
