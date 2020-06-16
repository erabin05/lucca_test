import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';
import { DisplayAmountPipe } from './pipes/display-amount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesListComponent,
    ExpenseItemComponent,
    DisplayAmountPipe
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
