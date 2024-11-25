
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//below only accept the control
// export function forbiddenNameValidator(control:AbstractControl):{[key:string]:any}|null{
//     const forbidden=/admin/.test(control.value);
//     return forbidden?{'forbiddenName':{value:control.value}}:null;
// }

//factor function to return object itself
// export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const forbidden = forbiddenName.test(control.value);
//     return forbidden ? { forbiddenName: { value: control.value } } : null;
//   };
// }


export function lettersAndSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = /^[A-Za-z\s]+$/.test(value);
    return isValid ? null : { invalidName: 'Only letters and spaces are allowed' };
  };
}