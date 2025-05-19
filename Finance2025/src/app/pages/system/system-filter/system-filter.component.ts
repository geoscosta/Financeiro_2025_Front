import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { GetSystemFilter } from '../service/models/system.service.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { InputTypeEnum } from '../../../shared/input/enums/input-type.enum';
import { InputComponent } from "../../../shared/input/input.component";
import { SecondaryButtonComponent } from "../../../shared/buttons/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../../shared/buttons/primary-button/primary-button.component";

@Component({
  selector: 'app-system-filter',
  standalone: true,
  imports: [CommonModule, InputComponent, SecondaryButtonComponent, PrimaryButtonComponent],
  templateUrl: './system-filter.component.html',
  styleUrl: './system-filter.component.scss'
})
export class SystemFilterComponent {
  public form: any;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      //status: [[]],
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
    });
  }

  @Output() filterEmmiter: EventEmitter<GetSystemFilter> =
    new EventEmitter<GetSystemFilter>();

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
  }

  handleToggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  clear() {
    this.form.reset();
    this.selectedStatus = [];
  }

  search() {
    let filter: GetSystemFilter = {} as GetSystemFilter;

    filter.name = this.form.controls.name.value ?? '';
    filter.startDate = this.form.controls.initialDate.value ?? '';
    filter.endDate = this.form.controls.finalDate.value ?? '';

    this.filterEmmiter.emit(filter);

    this.isOpen = false;
  }
}
