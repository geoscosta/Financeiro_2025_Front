import { CommonModule } from '@angular/common';
import { InputTypeEnum } from '../enums/input-type.enum';
import { PasswordValidationModel } from './../model/password-validation.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-validation.component.html',
  styleUrl: './password-validation.component.scss'
})
export class PasswordValidationComponent {
  @Input() validator: PasswordValidationModel = new PasswordValidationModel();

  public eInputTypeEnum = InputTypeEnum;
}
