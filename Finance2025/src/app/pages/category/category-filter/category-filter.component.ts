import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { GetCategoriesFilter } from '../service/models/category.service.model';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { InputTypeEnum } from '../../../shared/input/enums/input-type.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/input/input.component';
import { PrimaryButtonComponent } from "../../../shared/buttons/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../../shared/buttons/secondary-button/secondary-button.component";

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, InputComponent, PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  public form: any;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      //status: [[]],
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
    });
  }

  @Output() filterEmmiter: EventEmitter<GetCategoriesFilter> =
    new EventEmitter<GetCategoriesFilter>();

  isOpen: boolean = false;
  status: string[] = [];
  selectedStatus: string[] = [];
  isLoading: boolean = false;

  get ButtonColorEnum() {
    return ButtonColorEnum;
  }

  get InputTypeEnum() {
    return InputTypeEnum;
  }

  ngOnInit() {
    //this.populateStatus();
  }

  // populateStatus() {
  //   this.status = [StatusEnum.ATIVO, StatusEnum.INATIVO];
  // }

  handleToggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  clear() {
    this.form.reset();
    this.selectedStatus = [];
  }

  search() {
    let filter: GetCategoriesFilter = {} as GetCategoriesFilter;

    filter.name = this.form.controls.name.value ?? '';
    //filter.status = this.form.controls.status.value ?? null;
    filter.startDate = this.form.controls.initialDate.value ?? '';
    filter.endDate = this.form.controls.finalDate.value ?? '';

    this.filterEmmiter.emit(filter);

    this.isOpen = false;
  }
}
