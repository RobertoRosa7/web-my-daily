import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateEmailRegex } from '../../utils/regex/utils.regex.validators';

// field e-mail
export const emailField = new FormControl('', [
  Validators.required,
  Validators.email,
  Validators.pattern(validateEmailRegex),
]);

// field password
export const passwordField = new FormControl('', [Validators.required, Validators.minLength(6)]);
// field name id
export const nameIdField = new FormControl('', [Validators.required]);

// field nickname
export const nickNameField = new FormControl('');

/**
 * INFO:
 * checkPassword - responsible to match password
 *
 * @param controlName string field password (required)
 * @param matchingControlName string  field confirm password (required)
 * @returns (formGroup: FormGroup) => void
 */
export function checkPassword(controlName: string, matchingControlName: string): (formGroup: FormGroup) => void {
  // return function
  return (formGroup: FormGroup) => {
    // get field abstract controll of password
    const control: AbstractControl = formGroup.controls[controlName];

    // get field abstract controll of confirm password
    const matchingControl: AbstractControl = formGroup.controls[matchingControlName];

    // check if password and confirm is equal
    if (control.value === matchingControl.value) {
      matchingControl.setErrors(null);
      return;
    }

    // display error
    matchingControl.setErrors({ mustMatch: true });
  };
}

/**
 * INFO:
 * FieldsValidators - class field validators base
 */
export class FieldsValidators {
  public email = emailField;
  public password = passwordField;
}

/**
 * INFO:
 * FieldLogin - class field validator login
 */
export class FieldLogin extends FieldsValidators {}

/**
 * INFO:
 * FielRegister - class field validator register
 */
export class FielRegister extends FieldsValidators {
  public checkTerms = [false, [Validators.requiredTrue]];
}
