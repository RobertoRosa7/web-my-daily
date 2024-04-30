import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { FielRegister } from '../auth.field.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends AuthComponent implements OnInit {
  public isPasswordSame = true;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  /**
   * INFO:
   * ngOnInit - start life cycle hooks
   */
  public ngOnInit(): void {
    this.form = this.formBuilder.group(new FielRegister(), {
      validator: this.checkPassword('password', 'confirm_password'),
    });
  }

  /**
   * INFO:
   * getNameId = get name field from form
   */
  public get getNameId() {
    return this.form.get('nameId')?.value;
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

  /**
   * INFO:
   * onSubmit - make regiter listening event on submit from form
   */
  public onSubmit(): void {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const confirm_password = this.form.value.confirm_password;
  }
}
