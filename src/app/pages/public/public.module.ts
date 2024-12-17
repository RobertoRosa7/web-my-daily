import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { publicProfileReducer } from '@reducers/public/public-profile.reducer';
import { PublicProfileEffect } from '@effects/public/public-profile.effect';
import { PublicProfileService } from '@services/public/public-profile.service';
import { FollowersComponent } from '@components/followers/followers.component';
import { FooterComponent } from '@components/footer/footer.component';
import { MessageComponent } from '@components/messages/message.component';
import { CoverComponent } from '@components/cover/cover.component';
import { InitialExploreComponent } from '@components/initial-explore/initial-explore.component';
import { DialogAlertComponent } from '@components/dialog-alert/dialog-alert.component';
import { InputSearchComponent } from '@components/input-search/input-search.component';
import { InputPhotoComponent } from '@components/input-photo/input-photo.component';
import { ButtonBackComponent } from '@components/button-back/button-back.component';
import { UserDetailsComponent } from '@components/user-details/user-details.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';

import { SharedModule } from '@shared/shared.module';

import { routes } from './public.route';
import { Public } from './public';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponentProfilePublic } from './details/details.component';
import { Page404Component } from './404/page-404.component';

@NgModule({
  declarations: [Public, ProfileComponent, DetailsComponentProfilePublic],
  imports: [
    CommonModule,
    SharedModule,
    CoverComponent,
    FollowersComponent,
    UserDetailsComponent,
    InitialExploreComponent,
    DialogAlertComponent,
    InputSearchComponent,
    InputPhotoComponent,
    ButtonBackComponent,
    Page404Component,
    ToolbarComponent,
    FooterComponent,
    MessageComponent, 
    RouterModule.forChild(routes),
  ],
  providers: [
    provideState({ name: 'public', reducer: publicProfileReducer }),
    provideEffects([PublicProfileEffect]),
    PublicProfileService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class PublicModule {}
