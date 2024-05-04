import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-conditions/terms-conditions.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    providers: [],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms-conditions', component: TermsConditionComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'prefix' },
    ],
  },
];
