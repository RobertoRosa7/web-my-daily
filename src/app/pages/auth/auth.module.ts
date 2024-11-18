import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.services';
import { AuthComponent } from './auth.component';
import { AuthRepository } from './core/repositories/auth.repository';
import { HttpClientModule } from '@angular/common/http';
import { EmailComponent } from './core/components/input-email/email.component';
import { PasswordComponent } from './core/components/input-password/password.component';
import { NameIdComponent } from './core/components/input-name-id/name-id.component';
import { NickNameComponent } from './core/components/input-nickname/nickname.component';
import { ConfirmPasswordComponent } from './core/components/input-confirm-password/confirm-password.component';
import { routes } from './auth.routes';
import { ButtonSubmitComponent } from './core/components/button-submit/button-submit.component';
import { provideState } from '@ngrx/store';
import { authReducer } from './core/reducers/auth.reducer';
import { AuthEffect } from './core/effects/auth.effect';
import { provideEffects } from '@ngrx/effects';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/**
 * @see: https://ngrx.io/guide/store
 */
@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    EmailComponent,
    PasswordComponent,
    NameIdComponent,
    NickNameComponent,
    ConfirmPasswordComponent,
    ButtonSubmitComponent,
  ],
  providers: [
    AuthService,
    AuthRepository,
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(AuthEffect),
  ],
})
export class AuthModule {}
