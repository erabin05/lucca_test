import { TestBed } from '@angular/core/testing';

import { SelectedExpenseItemService } from './selected-expense-item.service';

describe('SelectedExpenseItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedExpenseItemService = TestBed.get(SelectedExpenseItemService);
    expect(service).toBeTruthy();
  });
});
