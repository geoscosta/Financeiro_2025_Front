import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../../shared/buttons/primary-button/primary-button.component';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetSystemFilter } from '../service/models/system.service.model';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';

@Component({
  selector: 'app-system-list',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent],
  templateUrl: './system-list.component.html',
  styleUrl: './system-list.component.scss'
})
export class SystemListComponent {
  constructor(

    public router: Router
  ) {}

  @Input() filter!: GetSystemFilter;

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


    this.filter = {} as GetSystemFilter;
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

    const filters = JSON.parse(JSON.stringify(this.filter));

    filters.pageNumber = this.page;
    filters.pageSize = this.pageSize;
  }

  handleSelectPage(index: number) {
    this.page = index;
    this.get();
  }

  navigateToNewForm() {
    this.router.navigate(['/system/new']);
  }
}
