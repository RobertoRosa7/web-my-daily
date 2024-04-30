import { AuthService } from '../core/services/auth.services';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { validateEmailRegex } from '../../../utils/regex/utils.regex.validators';
import * as authAction from '../core/action/auth.action';
import { Store } from '@ngrx/store';
import { IAuthState } from '../core/interface/auth.interface';
import { FieldLogin } from '../auth.field.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AuthComponent {

  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store<IAuthState>) {
    super();
    this.form = this.formBuilder.group(new FieldLogin());
  }

  onSubmit() {
    // Aqui você pode acessar os valores do formulário
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store.dispatch(authAction.actionLogin({ email, password }));
  }
}
