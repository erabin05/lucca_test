import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseItemForm, Amount } from 'src/app/entities/expense-item';
import { ExpensesService } from 'src/app/services/expenses.service';
import { AsideStatusService } from 'src/app/services/aside-status.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CurrencyRateService } from 'src/app/services/currency-rate.service';
import { RequieredFieldsService } from 'src/app/services/requiered-fields.service';

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
  convertedAmount: Amount;
  areRequierdFieldsFilledCorrectly: boolean;

  SEE = this.asideStatusService.SEE;
  CREATE = this.asideStatusService.CREATE;
  MODIFIE = this.asideStatusService.MODIFIE;

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService,
    public currencyRateService: CurrencyRateService,
    private asideStatusService: AsideStatusService,
    private notificationService: NotificationService,
    private requierdFiledsService: RequieredFieldsService
  ) { }

  ngOnInit() {
    this.title = this.toUpdate ? 'Modifier' : 'Nouvelle dépense';
    this.expenseItemFormGroup = this.formBuilder.group(this.expenseItem);
    this.initiateExpenseItemForm();
    this.convertAmount();
    this.checkRequierdFiled();
  }

  initiateExpenseItemForm(): void {
    if (this.toUpdate) {
      this.expensesService
          .getSelectedExpenseItem()
          .subscribe((item) => {
            this.expenseItem = new ExpenseItemForm(item);
            this.expenseItemFormGroup = this.formBuilder.group(this.expenseItem);
          });
    }
  }

  convertAmount(): void {
    this.currencyRateService
        .getConvertedAmount()
        .subscribe((convertedAmount) => {
          this.convertedAmount = convertedAmount;
        });
  }

  checkRequierdFiled() {
    this.requierdFiledsService
        .areRfsFilledCorrectly()
        .subscribe((areThey: boolean) => {
          this.areRequierdFieldsFilledCorrectly = areThey;
        });
  }

  submitForm(): void {
    this.expenseItemFormGroup.value.convertedAmount = this.convertedAmount.amount;
    if (this.areRequierdFieldsFilledCorrectly) {
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
    } else {
      this.notificationService.newNotification('Remplir les champs obligatoire');
    }
  }
}
