import { FormControl } from '@angular/forms';
import { PasswordValidationModel } from '../model/password-validation.model';

export class PasswordValidator 
{
  public static strong(control: FormControl) 
  {
    const pass = control.value;
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const hasSpecial = /[^A-Za-z0-9]/.test(control.value);
    const hasLength = pass?.length >= 8 && pass?.length <=10;

    const result = new PasswordValidationModel();
    result.digit = hasNumber;
    result.length = hasLength;
    result.special = hasSpecial;
    result.uppercase = hasUpper;
    result.lowercase = hasLower;

    if (hasLength && hasNumber && hasSpecial && hasUpper && hasLower) {
      result.valid = true;
    } else {
      result.valid = false;
    }

    return result;
  }
}
