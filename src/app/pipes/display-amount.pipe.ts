import { Pipe, PipeTransform } from '@angular/core';
import { Amount } from '../entities/expense-item';

@Pipe({
  name: 'displayAmount'
})
export class DisplayAmountPipe implements PipeTransform {

  transform(amount: Amount, ...args: any[]): string {
    return `${amount.amount} ${amount.currency}`;
  }

}
