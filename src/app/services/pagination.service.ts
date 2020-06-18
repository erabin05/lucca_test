import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pagination = new BehaviorSubject<object>({
    firstItemDisplayedIndex: 0,
    numberOfItemsDisplayed: 10,
    currentPage: 1
  });

  constructor(
  ) {}

  getPagination(): Observable<any> {
    return this.pagination.asObservable();
  }

  goToNextPage(): void {
    let currentP;
    this.pagination.subscribe({
      next : (currentPagination: any) => {
        currentP = currentPagination;
      }
    });
    this.pagination.next({
      ...currentP,
      firstItemDisplayedIndex: currentP.firstItemDisplayedIndex + currentP.numberOfItemsDisplayed,
      currentPage: currentP.currentPage + 1,
    });
  }

  goToPreviousPage(): void {
    let currentP;
    this.pagination.subscribe({
      next : (currentPagination: any) => {
        currentP = currentPagination;
      }
    });
    this.pagination.next({
      ...currentP,
      firstItemDisplayedIndex: currentP.firstItemDisplayedIndex - currentP.numberOfItemsDisplayed,
      currentPage: currentP.currentPage - 1,
    });
  }

  isFirstPage(): boolean {
    let page;
    this.pagination.subscribe({
      next: (currentP: any) => {
        page = currentP.currentPage;
      }
    });
    return page === 1;
  }

  // isLastPage(): boolean {
  //   let isLastPage: boolean;
  //   this.expensesService
  //     .getCountOfAllExpenseItems()
  //     .subscribe((count: number) => {
  //       this.pagination.subscribe({
  //         next: (currentP: any) => {
  //           isLastPage = currentP.currentPage * currentP.numberOfItemsDisplayed >= count;
  //         }
  //       });
  //     });
  //   return isLastPage;
  // }

  // getCountOfAllExpenseItems(): Observable<number> {
  //   return this.http.get(this.url)
  //             .pipe(
  //               map((data: any) => data.count)
  //             );
  // }
}
