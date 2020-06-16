export class Amount {
  amount: number;
  currency: string;
}

export class ExpenseItem {
  id: string;
  purchasedOn: string;
  nature: string;
  originalAmount: Amount;
  convertedAmount: Amount;
  comment?: string;
  createdAt: string;
  lastModifiedAt: string;
}
