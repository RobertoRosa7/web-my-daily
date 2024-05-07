import { Routes } from '@angular/router';
import { Profile } from './profile';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './settings/setting.component';

export const routes: Routes = [
  {
    path: '',
    component: Profile,
    children: [
      { path: 'user', component: UserComponent },
      { path: 'setting', component: SettingComponent },
      { path: '**', redirectTo: 'user', pathMatch: 'prefix' },
    ],
  },
];
