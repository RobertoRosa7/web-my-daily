import { Component } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { validateEmailRegex } from '../../../utils/regex/utils.regex.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends AuthComponent {
  public formRegister = this.FormBuilder.group({
    email: ['', Validators.required, Validators.email, Validators.pattern(validateEmailRegex)],
    password: [''],
    confirmPassword: [''],
    
  })
  constructor(private readonly FormBuilder: FormBuilder) {
    super();
  }
}
