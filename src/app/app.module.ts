import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseItemLineComponent } from './components/expense-item-line/expense-item-line.component';
import { DisplayAmountPipe } from './pipes/display-amount.pipe';
import { ExpenseItemAsideComponent } from './components/expense-item-aside/expense-item-aside.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesListComponent,
    ExpenseItemLineComponent,
    DisplayAmountPipe,
    ExpenseItemAsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
