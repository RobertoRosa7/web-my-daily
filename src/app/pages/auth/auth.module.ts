import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ButtonBackComponent } from '@components/button-back/button-back.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { MessageComponent } from '@components/messages/message.component';
import { UniqueNameService } from '@services/auth/unique-name.service';
import { authReducer } from '@reducers/auth/auth.reducer';
import { UniqueNameRepository } from '@repositories/auth/unique-name.repository';
import { AuthEffect } from '@effects/auth/auth.effect';
import { ButtonSubmitComponent } from '@components/button-submit/button-submit.component';
import { ConfirmPasswordComponent } from '@components/input-confirm-password/confirm-password.component';
import { EmailComponent } from '@components/input-email/email.component';
import { PasswordComponent } from '@components/input-password/password.component';
import { NameIdComponent } from '@components/input-name-id/name-id.component';
import { NickNameComponent } from '@components/input-nickname/nickname.component';
import { AuthService } from '@services/auth/auth.services';
import { SharedModule } from '@shared/shared.module';
import { AuthRepository } from '@repositories/auth/auth.repository';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { routes } from './auth.routes';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/**
 * @see: https://ngrx.io/guide/store
 */
@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent, CreatePasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EmailComponent,
    PasswordComponent,
    NameIdComponent,
    NickNameComponent,
    ConfirmPasswordComponent,
    ButtonSubmitComponent,
    MessageComponent,
    ButtonBackComponent,
    FooterComponent,
    ToolbarComponent,
    MessageComponent,
    RouterModule.forChild(routes),
  ],
  providers: [
    AuthService,
    AuthRepository,
    UniqueNameRepository,
    UniqueNameService,
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(AuthEffect),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AuthModule {}
