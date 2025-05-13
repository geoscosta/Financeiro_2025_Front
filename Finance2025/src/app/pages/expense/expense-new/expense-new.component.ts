import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { MaskTypeEnum } from '../../../shared/input/enums/mask-type.enum';
import { InputTypeEnum } from '../../../shared/input/enums/input-type.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { InputComponent } from "../../../shared/input/input.component";
import { SelectComponent } from "../../../shared/select/select.component";
import { SecondaryButtonComponent } from "../../../shared/buttons/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../../shared/buttons/primary-button/primary-button.component";
import { ModalResponseComponent } from "../../../shared/modal-response/modal-response.component";

@Component({
  selector: 'app-expense-new',
  standalone: true,
  imports: [CommonModule, ModalComponent, InputComponent, SelectComponent, SecondaryButtonComponent, PrimaryButtonComponent, ModalResponseComponent],
  templateUrl: './expense-new.component.html',
  styleUrl: './expense-new.component.scss'
})
export class ExpenseNewComponent {
  @Input() showModal: boolean = false;

  public isLoading: boolean = false;
  public error: boolean = false;
  public keywords: string[] = [];
  public form: any;
  public showAll: boolean = false;
  public showModalResponse: boolean = false;
  public titleModalResponse: string = '';
  public iconButtonModalResponse: string = '';
  public message: string = '';

  public get ButtonColorEnum() {
    return ButtonColorEnum;
  }
  public get MaskTypeEnum() {
    return MaskTypeEnum;
  }
  public get InputTypeEnum() {
    return InputTypeEnum;
  }

  constructor(
    public formBuilder: FormBuilder,
    public router: Router
  )
  {
    this.form = this.formBuilder.group({
    name: ['', Validators.required],
    active: ['', Validators.required],
    keyword: ['', Validators.required],
  });
  }

  ngOnInit(): void {
    this.showModal = true;
  }

  isFormValid() {
    return this.form.valid;
  }

  isFormComplete() {
    return (
      this.form.controls.name.valid &&
      this.form.controls.active.valid &&
      this.keywords.length > 0
    );
  }

  handleCloseModalResponse() {
    if (this.error == false) this.handleCloseModal();
    this.showModalResponse = false;
  }

  handleCloseModal() {
    this.form.reset();
    this.router.navigate(['/expense/']);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  handleAddKeyword() {
    const newKeyword = this.form.controls.keyword.value ?? '';

    if (newKeyword.trim() !== '') {
      this.keywords.push(newKeyword);
      this.form.controls.keyword.reset();
    }
  }

  isKeywordValid() {
    return (
      this.form.controls.keyword.valid &&
      !this.keywords.includes(this.form.controls.keyword.value ?? '')
    );
  }
}
