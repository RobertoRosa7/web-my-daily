import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { validateEmailRegex } from '../../../utils/regex/utils.regex.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends AuthComponent {
  isPasswordSame = false;

  public formRegister: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
    this.formRegister = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern(validateEmailRegex)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6), this.matchPasswords.bind(this)]],
        checkTerms: [false, Validators.requiredTrue],
      },
      { validator: this.checkPassword('password', 'confirm_password') }
    );
  }

  matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatch: null };
    }
    return true;
  }

  /**
   * INFO:
   * checkPassword - responsible to match password
   *
   * @param controlName string field password (required)
   * @param matchingControlName string  field confirm password (required)
   * @returns (formGroup: FormGroup) => void
   */
  public checkPassword(controlName: string, matchingControlName: string): (formGroup: FormGroup) => void {
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

      // invalidate field
      this.isPasswordSame = matchingControl.status === 'VALID' ? true : false;
    };
  }

  onSubmit() {
    if (this.formRegister.valid) {
      const email = this.formRegister.value.email;
      const password = this.formRegister.value.password;
      const confirm_password = this.formRegister.value.confirm_password;

      console.log('Email:', email);
      console.log('Senha:', password);
      console.log('Confirmar Senha:', confirm_password);
      console.log('Aceita os Termos:', this.formRegister.value.checkTerms);
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
}
