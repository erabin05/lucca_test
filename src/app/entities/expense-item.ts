export class Amount {
  amount: number;
  currency: string;

  constructor(
    amount?: number,
    currency?: string
  ) {
    if (amount && currency) {
      this.amount = amount;
      this.currency = currency;
    } else {
      this.amount = 0;
      this.currency = 'EUR';
    }
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
}

export class ExpenseItemForm {
  id?: string;
  purchasedOn: string;
  nature: string;
  originalAmount: number;
  originalAmountCurrency: string;
  convertedAmount: number;
  convertedAmountCurrency: string;
  comment?: string;

  constructor(
    expenseItem?: ExpenseItem
  ) {
    if (expenseItem) {
      this.id = expenseItem.id;
      this.purchasedOn = expenseItem.purchasedOn;
      this.nature = expenseItem.nature;
      this.originalAmount = expenseItem.originalAmount.amount;
      this.originalAmountCurrency = expenseItem.originalAmount.currency;
      this.convertedAmount = expenseItem.convertedAmount.amount;
      this.convertedAmountCurrency = expenseItem.convertedAmount.currency;
      this.comment = expenseItem.comment;
    } else {
      this.purchasedOn = new Date().toISOString().substr(0, 10);
      this.nature = '';
      this.originalAmount = 0;
      this.originalAmountCurrency = 'EUR';
      this.comment = '';
    }
  }
}
