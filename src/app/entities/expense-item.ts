import { Injectable } from '@angular/core';
import { CurrencyRateService } from '../services/currency-rate.service';
import { FormGroup } from '@angular/forms';

export class Amount {
  amount: number;
  currency: string;

  constructor(
    private currencyRateService?: CurrencyRateService
  ) {
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
}

export class ExpenseItemForm {
  id?: string;
  purchasedOn: string;
  nature: string;
  originalAmount: number;
  originalAmountCurrency: string;
  comment?: string;

  constructor(
    expenseItem?: ExpenseItem
  ) {
    if (expenseItem) {
      return {
        id: expenseItem.id,
        purchasedOn: expenseItem.purchasedOn,
        nature: expenseItem.nature,
        originalAmount: expenseItem.originalAmount.amount,
        originalAmountCurrency: expenseItem.originalAmount.currency,
        comment: expenseItem.comment,
        toExpenseItem: this.toExpenseItem
      };
    } else {
      return {
        purchasedOn: '',
        nature: '',
        originalAmount: 0,
        originalAmountCurrency: 'EUR',
        comment: '',
        toExpenseItem: this.toExpenseItem
      };
    }
  }

  toExpenseItem(): ExpenseItem {
    return {
      purchasedOn: this.purchasedOn,
      nature: this.nature,
      originalAmount: {
        amount: this.originalAmount,
        currency: this.originalAmountCurrency
      },
      convertedAmount: new Amount(),
      comment: this.comment
    };

  }
}
