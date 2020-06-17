import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <main>
      <app-expenses-list></app-expenses-list>
      <app-expense-item-aside></app-expense-item-aside>
    </main>
  `
})
export class AppComponent {
  title = 'lucca';
}
