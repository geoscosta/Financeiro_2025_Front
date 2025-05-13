import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetCategoriesFilter } from '../service/models/category.service.model';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { PrimaryButtonComponent } from "../../../shared/buttons/primary-button/primary-button.component";

@Component({
  selector: 'app-category-list',
  imports: [PrimaryButtonComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  constructor(

    public router: Router
  ) {}

  @Input() filter!: GetCategoriesFilter;

  //categoryList: GetCategoriesResponse[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  hasSupervisorRole: boolean = false;

  get ButtonColorEnum() {
    return ButtonColorEnum;
  }

  ngOnInit(): void {
    //const role = this.storageService.getRole();
    //this.hasSupervisorRole = role === UserRoleEnum.supervisor;

    this.filter = {} as GetCategoriesFilter;
    this.get();
  }

  ngOnChanges() {
    if (this.filter) {
      this.resetPage();
      this.get();
    }
  }

  resetPage() {
    this.page = 1;
  }

  get() {
    if (this.isLoading) return;

    this.isLoading = true;
    //this.clearItems();

    const filters = JSON.parse(JSON.stringify(this.filter));

    filters.pageNumber = this.page;
    filters.pageSize = this.pageSize;
  }

  // setCategoryList(data: GetCategoriesResponse[]) {
  //   if (!data?.length) return;

  //   this.categoryList = data.map((form) => ({
  //     id: form.id,
  //     name: form.name,
  //     active: form.active,
  //     creationDate: form.creationDate,
  //     keyword: [],
  //   }));
  // }

  handleSelectPage(index: number) {
    this.page = index;
    //this.clearItems();
    this.get();
  }

  // clearItems() {
  //   this.categoryList = [];
  // }

  navigateToNewForm() {
    this.router.navigate(['/category/new']);
  }
}
