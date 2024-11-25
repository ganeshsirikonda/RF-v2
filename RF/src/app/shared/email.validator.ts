import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // below means Regex to check if the email ends with gmail.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}
