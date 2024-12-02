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
import { profileReducer } from '../../core/reducers/profile/profile.reducer';
import { userReducer } from '../../core/reducers/user/user.reducer';
import { ProfileEffect } from '../../core/effects/profile/profile.effect';
import { provideEffects } from '@ngrx/effects';
import { HomeService } from '../../core/services/home/home.service';
import { HomeRepository } from '../../core/repositories/home/home.repository';
import { HappenRepository } from '../../core/repositories/happen/happen.repository';
import { HappenService } from '../../core/services/happens/happen.service';
import { happenReducer } from '../../core/reducers/happens/profile.happens.reducer';
import { FeelingsComponent } from '../../core/components/feelings/feelings.component';
import { publicProfileReducer } from '../../core/reducers/public/public-profile.reducer';
import { PublicProfileService } from '../../core/services/public/public-profile.service';
import { PublicProfileEffect } from '../../core/effects/public/public-profile.effect';
import { LikeEffect } from '../../core/effects/happens/like.effect';
import { HappensEffect } from '../../core/effects/happens/profile.happens.effect';
import { ExploreComponent } from './explore/explore.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [HomeComponent, InitialComponent, TimelineComponent, ExploreComponent, FeelingersComponent],
  imports: [
    RouterModule.forChild(routes),
    ToolbarComponent,
    CommonModule,
    CoverComponent,
    SharedModule,
    HighchartsChartModule,
    InitialExploreComponent,
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
