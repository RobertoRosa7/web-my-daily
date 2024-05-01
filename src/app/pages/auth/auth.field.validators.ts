import { Validators } from '@angular/forms';
import { validateEmailRegex } from '../../utils/regex/utils.regex.validators';

export class FieldsValidators {
  public email = ['', [Validators.required, Validators.email, Validators.pattern(validateEmailRegex)]];
  public password = ['', [Validators.required, Validators.minLength(6)]];
}

export class FieldLogin extends FieldsValidators {}
export class FielRegister extends FieldsValidators {
  public nameId = ['', [Validators.required]];
  public nickname = [''];
  public confirm_password = ['', [Validators.required, Validators.minLength(6)]];
  public checkTerms = [false, [Validators.requiredTrue]];
}
