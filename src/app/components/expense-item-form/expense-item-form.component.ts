import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseItem } from 'src/app/entities/expense-item';

@Component({
  selector: 'app-expense-item-form',
  templateUrl: './expense-item-form.component.html',
  styleUrls: ['./expense-item-form.component.scss']
})
export class ExpenseItemFormComponent implements OnInit {

  expenseItemForm: FormGroup;
  expenseItem = new ExpenseItem();

  // initialItemForm = {
  //   nature : ''
  // }

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.expenseItemForm = this.formBuilder.group(this.expenseItem);
  }

  submitForm() {
    console.log('coucou')
  }

}
