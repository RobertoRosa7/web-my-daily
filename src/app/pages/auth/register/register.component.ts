import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { FielRegister } from '../auth.field.validators';
import { IAuthState } from '../core/interfaces/auth.interface';
import { Store } from '@ngrx/store';
import { Common } from '../../../core/enums/bases/base.enum';

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
    this.form = this.formBuilder.group(new FielRegister());

    // clear form when some error happens
    this.form.valueChanges.subscribe(() => this.store.dispatch(this.clearAction()));
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
        nameId: this.getNameId + Common.daily,
        nickname: this.getNickName,
      })
    );
  }
}
