import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { IAuthState } from '../../../core/interfaces/auth/auth.interface';
import { Store } from '@ngrx/store';
import { FieldEmail } from '../auth.field.validators';
import { CommonModule } from '@angular/common';
import { EmailComponent } from '@components/input-email/email.component';
import { RouterModule } from '@angular/router';
import { ButtonSubmitComponent } from '@components/button-submit/button-submit.component';
import { MessageComponent } from '@components/messages/message.component';
import { ButtonBackComponent } from '@components/button-back/button-back.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmailComponent,
    RouterModule,
    ButtonSubmitComponent,
    ButtonBackComponent,
    MessageComponent,
  ],
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent extends AuthComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder, protected override readonly store: Store<IAuthState>) {
    super(store);
  }

  ngOnInit(): void {
    // create new instance form group
    this.form = this.formBuilder.group(new FieldEmail());
  }
}
