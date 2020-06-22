import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseItem, ExpenseItemForm, Amount } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';
import { AsideStatusService } from 'src/app/services/aside-status.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-expense-item-form',
  templateUrl: './expense-item-form.component.html',
  styleUrls: ['./expense-item-form.component.scss']
})
export class ExpenseItemFormComponent implements OnInit {
  @Input() toUpdate?: boolean;

  title: string;
  expenseItemFormGroup: FormGroup;
  expenseItem = new ExpenseItemForm();

  SEE = this.asideStatusService.SEE;
  CREATE = this.asideStatusService.CREATE;
  MODIFIE = this.asideStatusService.MODIFIE;

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService,
    public currencyRateService: CurrencyRateService,
    private asideStatusService: AsideStatusService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.title = this.toUpdate ? 'Modifier' : 'Nouvelle dépense';
    this.expenseItemFormGroup = this.formBuilder.group(this.expenseItem);
    this.initiateExpenseItemForm();

  }

  submitForm() {
    if (this.toUpdate) {
      this.expensesService
        .putExpenseItem(this.expenseItemFormGroup.value)
        .subscribe(res => {
          this.notificationService.newNotification(`La dépense a été modifiée`);
          this.expensesService.loadExpenseItemsInPage();
          this.expensesService.loadCountOfAllExpenseItems();
        });
    } else {
      this.expensesService
        .postExpenseItem(this.expenseItemFormGroup.value)
        .subscribe(res => {
          this.notificationService.newNotification(`La dépense a été créée`);
          this.expensesService.loadExpenseItemsInPage();
          this.expensesService.loadCountOfAllExpenseItems();
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

  convertCurrency() {
    const {
      purchasedOn,
      originalAmount,
      originalAmountCurrency
    } = this.expenseItemFormGroup.value;

    this.currencyRateService
        .convertInEuro(
          new Amount(originalAmount, originalAmountCurrency),
          purchasedOn
        )
        .subscribe((convertedAmount: Amount) => {
          this.expenseItemFormGroup.value.convertedAmount = convertedAmount.amount;
          this.expenseItemFormGroup.value.convertedAmountCurreny = convertedAmount.currency;
        });
  }

  // loadCurrencyRate() {
  //   if (this. toUpdate) {
  //     this.expensesService
  //       .getSelectedExpenseItem()
  //       .subscribe((expenseItem) => {
  //         this.currencyRateService.loadCurrencyRates(expenseItem.purchasedOn);
  //     });
  //   } else {
  //     this.currencyRateService.loadCurrencyRates();
  //   }
  // }
}
