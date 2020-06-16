import { ExpenseItem, Amount } from './expense-item';

describe('Amount', () => {
  it('should create an instance', () => {
    expect(new Amount()).toBeTruthy();
  });
});

describe('ExpenseItem', () => {
  it('should create an instance', () => {
    expect(new ExpenseItem()).toBeTruthy();
  });
});
