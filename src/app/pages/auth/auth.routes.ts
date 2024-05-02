import { Routes } from '@angular/router';
import { AuthEffect } from './core/effect/auth.effect';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { provideEffects } from '@ngrx/effects';

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
