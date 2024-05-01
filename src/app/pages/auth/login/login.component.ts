import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { Store } from '@ngrx/store';
import { IAuthState } from '../core/interface/auth.interface';
import { FieldLogin } from '../auth.field.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AuthComponent implements OnInit {
  /**
   *
   * @param formBuilder FormBuilder form react
   * @param store Store - layer redux store where are all data storagered
   */
  constructor(private readonly formBuilder: FormBuilder, protected override readonly store: Store<IAuthState>) {
    super(store);
  }

  /**
   * INFO:
   * ngOnInit - start life cycle hooks
   */
  public ngOnInit(): void {
    this.form = this.formBuilder.group(new FieldLogin());
    this.form.valueChanges.subscribe(() => this.store.dispatch(this.clearAction()));
  }

  /**
   * INFO:
   * onSubmit - make login listening event on submit from form
   */
  onSubmit() {
    // Aqui você pode acessar os valores do formulário
    this.store.dispatch(this.loginAction({ email: this.getEmail, password: this.getPassword }));
  }
}
