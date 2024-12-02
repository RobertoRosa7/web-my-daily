import { Routes } from '@angular/router';
import { Profile } from './profile';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './settings/setting.component';
import { AccountComponent } from './settings/account/account.component';
import { SecurityComponent } from './settings/security/security.component';
import { ChangeNameComponent } from './settings/account/change-name/change-name.component';
import { MenuSettingsComponent } from './settings/menu-settings/menu-settings.component';
import { ChangeDomainNameComponent } from './settings/account/change-domain-name/change-domain-name.component';

export const routes: Routes = [
  {
    path: '',
    component: Profile,
    children: [
      { path: 'user', component: UserComponent },
      {
        path: 'settings',
        component: SettingComponent,
        children: [
          { path: 'menu', component: MenuSettingsComponent },
          { path: 'account', component: AccountComponent },
          { path: 'security', component: SecurityComponent },
          { path: '**', redirectTo: 'menu', pathMatch: 'prefix' },
        ],
      },
      { path: 'change-name', component: ChangeNameComponent },
      { path: 'change-domain-name', component: ChangeDomainNameComponent },
      { path: '**', redirectTo: 'user', pathMatch: 'prefix' },
    ],
  },
];
