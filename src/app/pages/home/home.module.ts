import { NgModule } from '@angular/core';
import { HomeComponent } from './home';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { provideState } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { InitialComponent } from './initial/initial.component';
import { CoverComponent } from '../../core/components/cover/cover.component';
import { SharedModule } from '../../shared/shared.module';
import { InitialExploreComponent } from '../../core/components/initial-explore/initial-explore.component';
import { FeelingersComponent } from './feelingers/feelingers.component';
import { TimelineComponent } from './timeline/timeline.component';
import { InputSearchComponent } from '../../core/components/input-search/input-search.component';
import { ButtonFabCreateComponent } from '../../core/components/button-fab-create/button-fab-create.component';
import { profileReducer } from '../profile/core/reducers/profile.reducer';
import { userReducer } from '../profile/core/reducers/user.reducer';
import { ProfileEffect } from '../profile/core/effects/profile.effect';
import { provideEffects } from '@ngrx/effects';
import { HomeService } from './core/services/home.service';
import { HomeRepository } from './core/repositories/home.repository';
import { HappenRepository } from '../../core/repositories/happen.repository';
import { HappenService } from '../../core/services/happens/happen.service';
import { happenReducer } from '../../core/reducers/happens/profile.happens.reducer';
import { FeelingsComponent } from '../../core/components/feelings/feelings.component';
import { publicProfileReducer } from '../public/core/reducers/public-profile.reducer';
import { PublicProfileService } from '../public/core/services/public-profile.service';
import { PublicProfileEffect } from '../public/core/effects/public-profile.effect';
import { LikeEffect } from '../../core/effects/happens/like.effect';
import { HappensEffect } from '../../core/effects/happens/profile.happens.effect';

@NgModule({
  declarations: [HomeComponent, InitialComponent, TimelineComponent],
  imports: [
    RouterModule.forChild(routes),
    ToolbarComponent,
    CommonModule,
    CoverComponent,
    SharedModule,
    InitialExploreComponent,
    FeelingersComponent,
    InputSearchComponent,
    ButtonFabCreateComponent,
    FeelingsComponent,
  ],
  providers: [
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'public', reducer: publicProfileReducer }),
    provideState({ name: 'profileHappens', reducer: happenReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideEffects([ProfileEffect, PublicProfileEffect, LikeEffect, HappensEffect]),
    HomeService,
    HomeRepository,
    HappenRepository,
    HappenService,
    PublicProfileService,
  ],
})
export class HomeModule {}
