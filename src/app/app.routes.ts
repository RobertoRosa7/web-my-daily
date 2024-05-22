import { Routes } from '@angular/router';
import { resolver } from './core/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    resolve: { user: resolver },
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    resolve: { user: resolver },
  },
  {
    path: 'public',
    loadChildren: () => import('./pages/public/public.module').then((m) => m.PublicModule),
  },
  { path: '**', redirectTo: 'public', pathMatch: 'prefix' },
];
