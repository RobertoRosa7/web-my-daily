import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.services';
import { AuthComponent } from './auth.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AuthStore } from './core/store/auth.store';
import { AuthRepository } from './core/repository/auth.repository';
import { ConstantsRepository } from './core/repository/constants.repository';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'prefix' },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot({}),
    StoreModule.forFeature('auth', AuthStore),
    StoreDevtoolsModule.instrument({ maxAge: 45 }),
  ],
  providers: [AuthService, AuthRepository, ConstantsRepository],
})
export class AuthModule {}
