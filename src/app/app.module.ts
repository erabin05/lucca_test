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

import { DisplayAmountPipe } from './pipes/display-amount.pipe';

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
    SelectItemDirective
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
