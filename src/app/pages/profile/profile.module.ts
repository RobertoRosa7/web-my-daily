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
import { FollowersComponent } from './core/components/followers/followers.component';
import { FeelingsComponent } from './core/components/feelings/feelings.component';
import { UserDetailsComponent } from './core/components/user-details/user-details.component';
import { ProfileRepository } from './core/repositories/profile.repository';
import { ProfileService } from './core/services/profile.service';
import { LocalStorageService } from '../../core/services/localstorage/localstorage.service';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffect } from './core/effects/profile.effect';
import { profileHappenReducer } from './core/reducers/profile.happens.reducer';
import { ProfileHappensEffect } from './core/effects/profile.happens.effect';
import { InputPhotoComponent } from '../../core/components/input-photo/input-photo.component';
import { profileReducer } from './core/reducers/profile.reducer';
import { userReducer } from './core/reducers/user.reducer';

@NgModule({
  declarations: [Profile, UserComponent, SettingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ToolbarComponent,
    CoverComponent,
    FollowersComponent,
    FeelingsComponent,
    UserDetailsComponent,
    InputPhotoComponent,
  ],
  providers: [
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideState({ name: 'profileHappens', reducer: profileHappenReducer }),
    provideEffects([ProfileEffect, ProfileHappensEffect]),
    ProfileRepository,
    ProfileService,
    LocalStorageService,
  ],
})
export class ProfileModule {}
