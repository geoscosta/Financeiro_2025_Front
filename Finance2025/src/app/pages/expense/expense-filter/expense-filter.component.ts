import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetExpenseFilter } from '../service/models/expense.service.model';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { InputTypeEnum } from '../../../shared/input/enums/input-type.enum';
import { InputComponent } from "../../../shared/input/input.component";
import { SecondaryButtonComponent } from "../../../shared/buttons/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../../shared/buttons/primary-button/primary-button.component";

@Component({
  selector: 'app-expense-filter',
  standalone: true,
  imports: [CommonModule, InputComponent, SecondaryButtonComponent, PrimaryButtonComponent],
  templateUrl: './expense-filter.component.html',
  styleUrl: './expense-filter.component.scss'
})
export class ExpenseFilterComponent {
  public form: any;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      //status: [[]],
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
    });
  }

  @Output() filterEmmiter: EventEmitter<GetExpenseFilter> =
    new EventEmitter<GetExpenseFilter>();

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

  handleToggleAccordion() {
      this.isOpen = !this.isOpen;
    }

    clear() {
      this.form.reset();
      this.selectedStatus = [];
    }

    search() {
      let filter: GetExpenseFilter = {} as GetExpenseFilter;

      filter.name = this.form.controls.name.value ?? '';
      //filter.status = this.form.controls.status.value ?? null;
      filter.startDate = this.form.controls.initialDate.value ?? '';
      filter.endDate = this.form.controls.finalDate.value ?? '';

      this.filterEmmiter.emit(filter);

      this.isOpen = false;
    }
}
