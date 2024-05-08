import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'prefix' },
];
