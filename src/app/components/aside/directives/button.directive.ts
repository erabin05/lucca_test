import { Directive, Input, HostListener } from '@angular/core';
import { AsideStatusService } from 'src/app/services/aside-status.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {
  @Input('appButton') status: string;

  SEE = this.asideStatusService.SEE;
  CREATE = this.asideStatusService.CREATE;
  MODIFIE = this.asideStatusService.MODIFIE;

  constructor(
    private asideStatusService: AsideStatusService,
    private expenseService: ExpensesService
  ) { }

  @HostListener('click')
  transition() {
    if (this.status === this.SEE) {
      this.asideStatusService.toSEE();
    }
    if (this.status === this.CREATE) {
      this.asideStatusService.toCREATE();
    }
    if (this.status === this.MODIFIE) {
      this.asideStatusService.toMODIFIE();
    }
  }
}
