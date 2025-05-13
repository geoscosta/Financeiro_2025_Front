import { Component } from '@angular/core';
import { GetCategoriesFilter } from './service/models/category.service.model';
import { CategoryFilterComponent } from "./category-filter/category-filter.component";

@Component({
  selector: 'app-category',
  imports: [CategoryFilterComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  filter!: GetCategoriesFilter;

  setFilter(filter: GetCategoriesFilter) {
    this.filter = filter;
  }
}
