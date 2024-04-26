import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthComponent } from '../auth.component';
import { validateEmailRegex } from '../../../utils/regex/utils.regex.validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends AuthComponent {
  public formRegister = this.FormBuilder.group({
    email: [
      '',
      Validators.required,
      Validators.email,
      Validators.pattern(validateEmailRegex),
    ],
    password: [''],
    confirmPassword: [''],
  });
  constructor(private readonly FormBuilder: FormBuilder) {
    super();
  }
}
