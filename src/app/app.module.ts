import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { ExpenseItemAsideComponent } from './components/expense-item-aside/expense-item-aside.component';
import { ExpenseItemFormComponent } from './components/expense-item-form/expense-item-form.component';
import { ExpenseItemLineComponent } from './components/expense-item-line/expense-item-line.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonDirective } from './components/aside/directives/button.directive';
import { CurrencyInputDirective } from './components/expense-item-form/directives/currency-input.directive';
import { PageButtonDirective } from './components/expenses-list/directives/page-button.directive';
import { SelectItemDirective } from './components/expense-item-line/directives/select-item.directive';
import { DateInputDirective } from './components/expense-item-form/directives/date-input.directive';
import { AmountInputDirective } from './components/expense-item-form/directives/amount-input.directive';

import { DisplayAmountPipe } from './pipes/display-amount.pipe';
import { ExpensesListSortbarComponent } from './components/expenses-list-sortbar/expenses-list-sortbar.component';
import { SortButtonDirective } from './components/expenses-list-sortbar/directives/sort-button.directive';


@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    ButtonDirective,
    CurrencyInputDirective,
    DisplayAmountPipe,
    ExpenseItemAsideComponent,
    ExpenseItemLineComponent,
    ExpensesListComponent,
    ExpenseItemFormComponent,
    HeaderComponent,
    NotificationsComponent,
    PageButtonDirective,
    SelectItemDirective,
    DateInputDirective,
    AmountInputDirective,
    ExpensesListSortbarComponent,
    SortButtonDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
