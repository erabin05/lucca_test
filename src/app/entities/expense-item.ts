export class Amount {
  amount: number;
  currency: string;

  constructor() {
    this.amount = 0;
    this.currency = 'EUR';
  }
}

export class ExpenseItem {
  id?: string;
  purchasedOn: string;
  nature: string;
  originalAmount: Amount;
  convertedAmount: Amount;
  comment?: string;
  createdAt?: string;
  lastModifiedAt?: string;
  selected?: boolean;

  constructor() {
    this.id = '';
    this.purchasedOn = '';
    this.nature = '';
    this.originalAmount = new Amount();
    this.convertedAmount = new Amount();
  }

  form?(expenseItem?: ExpenseItem): object {
    if (expenseItem) {
      return {
        purchasedOn: expenseItem.purchasedOn,
        nature: expenseItem.nature,
        originalAmount: expenseItem.originalAmount.amount,
        originalAmountCurrency: expenseItem.originalAmount.currency,
        comment: expenseItem.comment
      };
    } else {
      return {
        purchasedOn: this.purchasedOn,
        nature: this.nature,
        originalAmount: this.originalAmount.amount,
        originalAmountCurrency: this.originalAmount.currency,
        comment: ''
      };
    }
  }

  submitForm?(newExpenseForm): ExpenseItem {
    return {
      purchasedOn: newExpenseForm.purchasedOn,
      nature: newExpenseForm.nature,
      originalAmount: {
        amount: newExpenseForm.originalAmount,
        currency: newExpenseForm.originalAmountCurrency
      },
      convertedAmount: new Amount(),
      comment: newExpenseForm.comment
    };
  }

}
