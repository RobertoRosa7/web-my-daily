import { Routes } from '@angular/router';
import { Public } from './public';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponentProfilePublic } from './details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: Public,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'details',
        component: DetailsComponentProfilePublic,
      },
      { path: '**', redirectTo: '', pathMatch: 'prefix' },
    ],
  },
];
