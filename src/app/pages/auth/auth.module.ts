import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.services';
import { AuthComponent } from './auth.component';
import { AuthRepository } from './core/repository/auth.repository';
import { ConstantsRepository } from './core/repository/constants.repository';
import { HttpClientModule } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { AuthEffect } from './core/effect/auth.effect';

export const routes: Routes = [
  {
    path: '',
    providers: [provideEffects(AuthEffect)],
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'prefix' },
    ],
  },
];

/**
 * @see: https://ngrx.io/guide/store
 */
@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthService, AuthRepository, ConstantsRepository],
})
export class AuthModule {}
