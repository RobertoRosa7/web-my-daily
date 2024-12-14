import { Routes } from '@angular/router';
import { Profile } from './profile';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './settings/setting.component';
import { AccountComponent } from './settings/account/account.component';
import { SecurityComponent } from './settings/security/security.component';
import { ChangeNameComponent } from './settings/account/change-name/change-name.component';
import { MenuSettingsComponent } from './settings/menu-settings/menu-settings.component';
import { ChangeDomainNameComponent } from './settings/account/change-domain-name/change-domain-name.component';
import { authGuard } from '@guards/auth.guard';
import { ResumeUserInfoComponent } from './settings/account/resume-user-info/resume-user-info.component';
import { MenuAccountComponent } from './settings/account/menu-account/menu-account.component';

export const routes: Routes = [
  {
    path: '',
    component: Profile,
    canActivate: [authGuard],
    children: [
      { path: 'user', component: UserComponent },
      {
        path: 'settings',
        component: SettingComponent,
        children: [
          { path: 'menu-settings', component: MenuSettingsComponent },
          {
            path: 'account',
            component: AccountComponent,
            children: [
              {
                path: 'menu-account',
                component: MenuAccountComponent,
              },
              {
                path: 'resume-user-info',
                component: ResumeUserInfoComponent,
              },
              { path: 'change-name', component: ChangeNameComponent },
              { path: 'change-domain-name', component: ChangeDomainNameComponent },
              { path: '**', redirectTo: 'menu-account', pathMatch: 'prefix' },
            ],
          },
          { path: 'security', component: SecurityComponent },
          { path: '**', redirectTo: 'menu-settings', pathMatch: 'prefix' },
        ],
      },
      { path: '**', redirectTo: 'user', pathMatch: 'prefix' },
    ],
  },
];
