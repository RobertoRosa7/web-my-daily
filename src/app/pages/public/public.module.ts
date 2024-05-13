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
import { Page404Component } from './404/page-404.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from '../profile/core/services/profile.service';
import { profileReducer } from '../profile/core/reducers/profile.reducer';
import { provideState } from '@ngrx/store';
import { ProfileEffect } from '../profile/core/effects/profile.effect';
import { provideEffects } from '@ngrx/effects';
import { InitialExploreComponent } from '../home/core/components/initial-explore/initial-explore.component';
import { userReducer } from '../profile/core/reducers/user.reducer';

@NgModule({
  declarations: [Public, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    CoverComponent,
    FollowersComponent,
    UserDetailsComponent,
    Page404Component,
    InitialExploreComponent,
  ],

  providers: [
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideEffects([ProfileEffect]),
    ProfileService,
  ],
})
export class PublicModule {}
