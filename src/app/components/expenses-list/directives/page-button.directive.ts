import { Directive, Input, HostListener } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Directive({
  selector: '[appPageButton]'
})
export class PageButtonDirective {
  @Input('appPageButton') direction: string;

  constructor(
    private paginationService: PaginationService,
  ) { }

  @HostListener('click')
  changePage() {
    if (this.direction === 'PREVIOUS') {
      this.paginationService.goToPreviousPage();
    }
    if (this.direction === 'NEXT') {
      this.paginationService.goToNextPage();
    }
  }

}
