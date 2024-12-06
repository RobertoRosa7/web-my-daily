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
  template: `
    <div class="main flex flex-col items-center justify-center">
      <div class="py-3 px-5 w-full max-w-md">
        <app-button-back class="btn-float right"></app-button-back>
        <h1 class="title">Recupere seu acesso</h1>
        <app-message></app-message>
        <form [formGroup]="form">
          <div class="flex flex-col gap-y-5">
            <app-input-email (trigger)="onFireEvent(fieldNames.email, $event)"></app-input-email>
            <div class="flex gap-2 link">
              Não tem uma conta?
              <a
                role="link"
                aria-describedby="register new user"
                routerLink="/auth/register"
                class="underline text-blue-500"
                >Cadastrar-se</a
              >
            </div>
            <app-button-submit [form]="form" [name]="'Recuperar'"></app-button-submit>
          </div>
        </form>
      </div>
    </div>
  `,
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
