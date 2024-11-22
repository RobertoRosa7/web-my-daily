import { NgModule } from '@angular/core';
import { Profile } from './profile';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './profile.route';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './settings/setting.component';
import { provideState } from '@ngrx/store';
import { CoverComponent } from '../../core/components/cover/cover.component';
import { FeelingsComponent } from '../../core/components/feelings/feelings.component';
import { UserDetailsComponent } from '../../core/components/user-details/user-details.component';
import { ProfileRepository } from './core/repositories/profile.repository';
import { ProfileService } from './core/services/profile.service';
import { LocalStorageService } from '../../core/services/localstorages/localstorage.service';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffect } from './core/effects/profile.effect';
import { happenReducer } from '../../core/reducers/happens/profile.happens.reducer';
import { InputPhotoComponent } from '../../core/components/input-photo/input-photo.component';
import { profileReducer } from './core/reducers/profile.reducer';
import { userReducer } from './core/reducers/user.reducer';
import { FollowersComponent } from '../../core/components/followers/followers.component';
import { ButtonFabCreateComponent } from '../../core/components/button-fab-create/button-fab-create.component';
import { HappenService } from '../../core/services/happens/happen.service';
import { HappenRepository } from '../../core/repositories/happen.repository';
import { HappensEffect } from '../../core/effects/happens/profile.happens.effect';
import { LikeEffect } from '../../core/effects/happens/like.effect';
import { AccountComponent } from './settings/account/account.component';
import { MenuSettingsComponent } from './settings/menu-settings/menu-settings.component';
import { ButtonBackComponent } from '../../core/components/button-back/button-back.component';
import { SecurityComponent } from './settings/security/security.component';
import { ChangeNameComponent } from './settings/account/change-name/change-name.component';
import { ChangeDomainNameComponent } from './settings/account/change-domain-name/change-domain-name.component';
import { UniqueNameRepository } from '../auth/core/repositories/unique-name.repository';
import { UniqueNameService } from '../auth/core/services/unique-name.service';

@NgModule({
  declarations: [Profile, UserComponent, AccountComponent, MenuSettingsComponent, SettingComponent, SecurityComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ToolbarComponent,
    CoverComponent,
    FollowersComponent,
    FeelingsComponent,
    FeelingsComponent,
    UserDetailsComponent,
    InputPhotoComponent,
    ButtonFabCreateComponent,
    ButtonBackComponent,
    ChangeNameComponent,
    ChangeDomainNameComponent,
  ],
  providers: [
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'profileHappens', reducer: happenReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideEffects([ProfileEffect, HappensEffect, LikeEffect]),
    ProfileRepository,
    ProfileService,
    LocalStorageService,
    HappenRepository,
    HappenService,
    UniqueNameRepository,
    UniqueNameService,
  ],
})
export class ProfileModule {}
