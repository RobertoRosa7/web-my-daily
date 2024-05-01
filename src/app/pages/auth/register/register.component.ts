import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { FielRegister } from '../auth.field.validators';
import { IAuthState } from '../core/interface/auth.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends AuthComponent implements OnInit {
  public isPasswordSame = true;

  constructor(private readonly formBuilder: FormBuilder, protected override readonly store: Store<IAuthState>) {
    super(store);
  }

  /**
   * INFO:
   * ngOnInit - start life cycle hooks
   */
  public ngOnInit(): void {
    // create new instance form group
    this.form = this.formBuilder.group(new FielRegister(), {
      validator: this.checkPassword('password', 'confirm_password'),
    });

    // clear form when some error happens
    this.form.valueChanges.subscribe(() => this.store.dispatch(this.clearAction()));
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
    // starting loading
    this.store.dispatch(this.loading({ isLoading: true }));

    // starting payload to make register
    this.store.dispatch(
      this.registerActioln({
        email: this.getEmail,
        password: this.getPassword,
        checkTerms: this.getCheckTerms,
        nameId: this.getNameId + this.domainSuffix,
        nickname: this.getNickName,
      })
    );
  }
}
