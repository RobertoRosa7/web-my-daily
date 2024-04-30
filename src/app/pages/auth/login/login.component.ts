import { AuthService } from './../services/auth.services';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { validateEmailRegex } from '../../../utils/regex/utils.regex.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AuthComponent {
  public formLogin: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) {
    super();
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(validateEmailRegex)]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      // Aqui você pode acessar os valores do formulário
      const email = this.formLogin.value.email;
      const password = this.formLogin.value.password;

      this.authService.login({ email, password });
    } else {
      // Se o formulário não for válido, você pode realizar ações apropriadas, como mostrar mensagens de erro
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
}
