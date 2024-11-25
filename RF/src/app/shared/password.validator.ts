import { AbstractControl } from "@angular/forms";

//here control does not represent the individual parameter it only represent the whole registration form (formgroup)
export function passwordValidator(control: AbstractControl): {[key: string]:boolean} | null{
   const password = control.get('password');
   const confirmPassword = control.get('confirmPassword')
   if(password?.pristine || confirmPassword?.pristine)
    return null;
   return password && confirmPassword && password.value != confirmPassword.value ? {'misMatch':true} : null;
}