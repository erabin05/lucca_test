import { DisplayAmountPipe } from './display-amount.pipe';
import { Amount } from '../entities/expense-item';

describe('DisplayAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayAmountPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform amount in string with amount and currency', () => {
    const expectedResult = '12 EUR';
    const pipe = new DisplayAmountPipe();
    const amount = new Amount(12, 'EUR');
    expect(pipe.transform(amount)).toEqual(expectedResult);
  });
});
