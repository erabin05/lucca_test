export class Amount {
  amount: number;
  currency: string;

  constructor() {
    this.amount = 0;
    this.currency = 'EUR';
  }
}

export class ExpenseItem {
  id: string;
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
