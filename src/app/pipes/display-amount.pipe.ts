import { Pipe, PipeTransform } from '@angular/core';
import { Amount } from '../entities/expense-item';

@Pipe({
  name: 'displayAmount'
})
export class DisplayAmountPipe implements PipeTransform {

  transform(amount: Amount, type?: string, originalCurrency?: string): string {
    if (type === 'convertedAmount' && originalCurrency === 'EUR') {
      return '-------';
    }
    return `${amount.amount} ${amount.currency}`;
  }

}
