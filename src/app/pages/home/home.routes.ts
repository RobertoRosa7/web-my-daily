import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { InitialComponent } from './initial/initial.component';
import { authGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [],
    canActivate: [authGuard],
    children: [
      { path: 'initial', component: InitialComponent },
      { path: '**', redirectTo: 'initial', pathMatch: 'prefix' },
    ],
  },
];
