import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTypeEnum } from './enums/input-type.enum';
import { MaskTypeEnum } from './enums/mask-type.enum';
import { PasswordValidator } from './helper/password.validator';
import { PasswordValidationModel } from './model/password-validation.model';
import { PasswordValidationComponent } from './password-validation/password-validation.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    PasswordValidationComponent,
  ],
  providers: [provideNgxMask()],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnChanges {
  @Input() control = new FormControl('');
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() error: boolean = false;
  @Input() mask!: MaskTypeEnum;
  @Input() type: InputTypeEnum = InputTypeEnum.text;
  @Input() optional: boolean = false;
  @Input() disabled: boolean = false;
  @Input() passwordValidation: boolean = false;
  @Input() width: string = '';
  @Input() maxlength: number | null = null;
  @Input() backgroundColorGrey: boolean = false;
  @Input() paddingTopSection: string = '';
  @Input() paddingLeftSection: string = '';
  @Input() paddingRightSection: string = '';
  @Input() paddingTop: string = '';
  @Input() loading: boolean = false;
  @Input() rightLoading: string = '1rem';
  @Input() visible: boolean = true;

  @Output() callbackFunc: EventEmitter<void> = new EventEmitter<void>();
  @Output() valueChange: EventEmitter<string | null> = new EventEmitter();

  public PasswordValidModel = new PasswordValidationModel();

  @HostListener('keydown', ['$event'])
  keydownEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.callbackFunc.emit();
    }
  }

  ngOnInit(): void {
    if (this.type === InputTypeEnum.password) {
      this.control.valueChanges.subscribe(
        this.passwordControlValueChanges.bind(this)
      );
    }
  }

  ngOnChanges(): void {
    if (this.disabled) {
      this.control.disable();
    } else if (!this.disabled && !this.control.enabled) {
      this.control.enable();
    }
  }

  passwordControlValueChanges() {
    this.PasswordValidModel = PasswordValidator.strong(this.control);
  }

  selectMask() {
    switch (this.mask) {
      case MaskTypeEnum.cpf:
        return '000.000.000-00';
      case MaskTypeEnum.date:
        return '00/00/0000';
      case MaskTypeEnum.number:
        return '9{' + this.maxlength + '}';
      case MaskTypeEnum.cnpj:
        return '00.000.000/0000-00';
      case MaskTypeEnum.time:
        return '00:00:00';
      default:
        return '';
    }
  }

  onChange() {
    this.valueChange.emit(this.control.value);
  }
}
