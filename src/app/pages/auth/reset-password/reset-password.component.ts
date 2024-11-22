import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { IAuthState } from '../core/interfaces/auth.interface';
import { Store } from '@ngrx/store';
import { FieldEmail } from '../auth.field.validators';

@Component({
  selector: 'app-reset-password',
  template: `
    <main>
      <div class="flex flex-col items-center justify-center h-screen">
        <div class="py-3 px-5 w-full max-w-md">
          <h1 class="text-center mb-5">e-mail para recuperar a senha.</h1>
          <form [formGroup]="form">
            <div class="px-5 flex flex-col gap-y-5">
              <app-input-email (trigger)="onFireEvent(fieldNames.email, $event)"></app-input-email>
              <div class="flex gap-2">
                Não tem uma conta?
                <a
                  role="link"
                  aria-describedby="register new user"
                  routerLink="/auth/register"
                  class="underline text-blue-500"
                  >Cadastrar-se</a
                >
              </div>
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
