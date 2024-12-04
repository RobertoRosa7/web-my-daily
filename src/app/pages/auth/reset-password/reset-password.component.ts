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
    MessageComponent,
  ],
  styles: `
    .main {
      padding-top: 10rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
    h1, div.link {
      padding-left: 1rem;
    }
  `,
  template: `
    <main class="main">
      <div class="flex flex-col items-center justify-center">
        <div class="w-full max-w-md">
          <h1 class="mb-5">Recuperar a senha.</h1>
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
    </main>
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
