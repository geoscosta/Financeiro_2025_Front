import { Component } from '@angular/core';
import { ExpenseFilterComponent } from "./expense-filter/expense-filter.component";
import { ExpenseListComponent } from "./expense-list/expense-list.component";
import { GetExpenseFilter } from './service/models/expense.service.model';

@Component({
  selector: 'app-expense',
  imports: [ExpenseFilterComponent, ExpenseListComponent],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  filter!: GetExpenseFilter;

    setFilter(filter: GetExpenseFilter) {
      this.filter = filter;
    }
}
