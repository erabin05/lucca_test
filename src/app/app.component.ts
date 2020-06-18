import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <app-header></app-header>
    <main>
      <app-expenses-list></app-expenses-list>
      <app-aside></app-aside>
    </main>
  `
})
export class AppComponent {
  title = 'lucca';
}
