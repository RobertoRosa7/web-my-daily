import { NgModule } from '@angular/core';
import { Profile } from './profile';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './profile.route';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './settings/setting.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ButtonSubmitComponent } from '@components/button-submit/button-submit.component';
import { NameIdComponent } from '@components/input-name-id/name-id.component';
import { NickNameComponent } from '@components/input-nickname/nickname.component';
import { AccountComponent } from './settings/account/account.component';
import { MenuSettingsComponent } from './settings/menu-settings/menu-settings.component';
import { SecurityComponent } from './settings/security/security.component';
import { ChangeDomainNameComponent } from './settings/account/change-domain-name/change-domain-name.component';
import { ChangeNameComponent } from './settings/account/change-name/change-name.component';
import { FollowersComponent } from '@components/followers/followers.component';
import { InputPhotoComponent } from '@components/input-photo/input-photo.component';
import { ButtonFabCreateComponent } from '@components/button-fab-create/button-fab-create.component';
import { ButtonBackComponent } from '@components/button-back/button-back.component';
import { MessageComponent } from '@components/messages/message.component';
import { profileReducer } from '@reducers/profile/profile.reducer';
import { happenReducer } from '@reducers/happens/profile.happens.reducer';
import { userReducer } from '@reducers/user/user.reducer';
import { LikeEffect } from '@effects/happens/like.effect';
import { HappensEffect } from '@effects/happens/profile.happens.effect';
import { ProfileEffect } from '@effects/profile/profile.effect';
import { HappenRepository } from '@repositories/happen/happen.repository';
import { HappenService } from '@services/happens/happen.service';
import { UniqueNameRepository } from '@repositories/auth/unique-name.repository';
import { UniqueNameService } from '@services/auth/unique-name.service';
import { SharedModule } from '@shared/shared.module';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { CoverComponent } from '@components/cover/cover.component';
import { FeelingsComponent } from '@components/feelings/feelings.component';
import { UserDetailsComponent } from '@components/user-details/user-details.component';
import { ProfileRepository } from '@repositories/profile/profile.repository';
import { ProfileService } from '@services/profile/profile.service';
import { LocalStorageService } from '@services/localstorages/localstorage.service';

@NgModule({
  declarations: [
    Profile,
    UserComponent,
    AccountComponent,
    MenuSettingsComponent,
    SettingComponent,
    SecurityComponent,
    ChangeDomainNameComponent,
    ChangeNameComponent,
  ],
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
    MessageComponent,
    ButtonSubmitComponent,
    NameIdComponent,
    NickNameComponent,
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
