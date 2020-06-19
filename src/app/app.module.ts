import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseItemLineComponent } from './components/expense-item-line/expense-item-line.component';
import { DisplayAmountPipe } from './pipes/display-amount.pipe';
import { ExpenseItemAsideComponent } from './components/expense-item-aside/expense-item-aside.component';
import { SelectItemDirective } from './components/expense-item-line/directives/select-item.directive';
import { ExpenseItemFormComponent } from './components/expense-item-form/expense-item-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Amount } from './entities/expense-item';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonDirective } from './components/aside/directives/button.directive';
import { PageButtonDirective } from './components/expenses-list/directives/page-button.directive';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesListComponent,
    ExpenseItemLineComponent,
    DisplayAmountPipe,
    ExpenseItemAsideComponent,
    SelectItemDirective,
    ExpenseItemFormComponent,
    AsideComponent,
    HeaderComponent,
    ButtonDirective,
    PageButtonDirective,
    NotificationsComponent
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
