import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoverComponent } from '../../core/components/cover/cover.component';
import { routes } from './public.route';
import { Public } from './public';
import { FollowersComponent } from '../profile/core/components/followers/followers.component';
import { UserDetailsComponent } from '../profile/core/components/user-details/user-details.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from '../profile/core/services/profile.service';
import { profileReducer } from '../profile/core/reducers/profile.reducer';
import { provideState } from '@ngrx/store';
import { ProfileEffect } from '../profile/core/effects/profile.effect';
import { provideEffects } from '@ngrx/effects';
import { InitialExploreComponent } from '../home/core/components/initial-explore/initial-explore.component';
import { userReducer } from '../profile/core/reducers/user.reducer';
import { DialogAlertComponent } from '../../core/components/dialog-alert/dialog-alert.component';
import { InputSearchComponent } from '../../core/components/input-search/input-search.component';
import { InputPhotoComponent } from '../../core/components/input-photo/input-photo.component';
import { ButtonBackComponent } from '../../core/components/button-back/button-back.component';
import { DetailsComponentProfilePublic } from './details/details.component';
import { Page404Component } from './404/page-404.component';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';

@NgModule({
  declarations: [Public, ProfileComponent, DetailsComponentProfilePublic],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    CoverComponent,
    FollowersComponent,
    UserDetailsComponent,
    InitialExploreComponent,
    DialogAlertComponent,
    InputSearchComponent,
    InputPhotoComponent,
    ButtonBackComponent,
    Page404Component,
    ToolbarComponent
  ],

  providers: [
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideEffects([ProfileEffect]), ProfileService],
})
export class PublicModule {}
