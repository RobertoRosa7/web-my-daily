import { Routes } from '@angular/router';
import { Public } from './public';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: Public,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      { path: '**', redirectTo: '', pathMatch: 'prefix' },
    ],
  },
];
