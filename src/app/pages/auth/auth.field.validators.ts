import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { UniqueNameService } from '@services/auth/unique-name.service';
import { validateEmailPattern, validatePasswordPattern } from '@utils/regex/utils.regex.validators';

// field e-mail
export const emailField = new FormControl(null, {
  validators: [Validators.required, Validators.email, Validators.pattern(validateEmailPattern)],
});

// field password
export const passwordField = new FormControl(null, {
  validators: [Validators.required, Validators.minLength(6), Validators.pattern(validatePasswordPattern)],
});

// field nickname
export const nickNameField = new FormControl(null, {
  validators: [Validators.required, Validators.minLength(4)],
});

/**
 * field name id
 *
 * @param service UniqueNameService
 * @returns FormControl
 */
export function nameIdField(service: UniqueNameService) {
  return new FormControl(null, {
    validators: [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
    asyncValidators: [uniqueDomainNameValidator(service)],
    updateOn: 'change',
  });
}

/**
 * confirm password validator
 *
 * @param password AbstractControl | null
 * @returns
 */
export function confirmPasswordValidator(password: AbstractControl | null) {
  return (control: AbstractControl): ValidationErrors | null => {
    return password && password.value === control.value ? null : { mustMatch: true };
  };
}

/**
 *
 * @param password AbstractControl | null
 * @returns FormControl
 */
export function confirmPassword(password: AbstractControl | null) {
  return new FormControl(null, {
    validators: [Validators.required, Validators.minLength(6), confirmPasswordValidator(password)],
    updateOn: 'change',
  });
}

/**
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
 *
 * @param service UniqueNameService
 * @returns AsyncValidatorFn
 */
export function uniqueDomainNameValidator(service: UniqueNameService): AsyncValidatorFn {
  const response = of(null);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const domainName = control.value;

    if (!domainName) {
      return response;
    }

    // Retorna um Observable que será acionado quando o resultado da pesquisa estiver disponível
    return service.isUniqueName(domainName).pipe(
      // layer - validadora se houver resultado ou não
      switchMap(({ data }) => of(data.length > 0 ? { uniqueDomainName: true } : null)), // Verifica se há resultados na lista de usuários
      // layer - capturar possíveis erros
      catchError(() => response)
    );
  };
}

// field e-mail
export class FieldEmail {
  public email = emailField;
}

// field password
export class FieldPassword {
  public password = passwordField;
}

// FieldsValidators - class field validators base
export class FieldsValidators extends FieldPassword {
  public email = emailField;
}

// FieldLogin - class field validator login
export class FieldLogin extends FieldsValidators {}

// FielRegister - class field validator register
export class FielRegister extends FieldsValidators {
  public checkTerms = [false, [Validators.requiredTrue]];
}
