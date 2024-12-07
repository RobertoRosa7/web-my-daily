import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoverComponent } from '../../core/components/cover/cover.component';
import { routes } from './public.route';
import { Public } from './public';
import { UserDetailsComponent } from '../../core/components/user-details/user-details.component';
import { ProfileComponent } from './profile/profile.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { InitialExploreComponent } from '../../core/components/initial-explore/initial-explore.component';
import { DialogAlertComponent } from '../../core/components/dialog-alert/dialog-alert.component';
import { InputSearchComponent } from '../../core/components/input-search/input-search.component';
import { InputPhotoComponent } from '../../core/components/input-photo/input-photo.component';
import { ButtonBackComponent } from '../../core/components/button-back/button-back.component';
import { DetailsComponentProfilePublic } from './details/details.component';
import { Page404Component } from './404/page-404.component';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { publicProfileReducer } from '../../core/reducers/public/public-profile.reducer';
import { PublicProfileEffect } from '../../core/effects/public/public-profile.effect';
import { PublicProfileService } from '../../core/services/public/public-profile.service';
import { FollowersComponent } from '../../core/components/followers/followers.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { MessageComponent } from '@components/messages/message.component';

@NgModule({
  declarations: [Public, ProfileComponent, DetailsComponentProfilePublic],
  imports: [
    CommonModule,
    SharedModule,
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
    ToolbarComponent,
    FooterComponent,
    MessageComponent,
  ],
  providers: [
    provideState({ name: 'public', reducer: publicProfileReducer }),
    provideEffects([PublicProfileEffect]),
    PublicProfileService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class PublicModule {}
