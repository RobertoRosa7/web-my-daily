import { NgModule } from '@angular/core';
import { Profile } from './profile';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './profile.route';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './settings/setting.component';
import { provideState } from '@ngrx/store';
import { colorReducer } from './core/reducers/color.reducer';
import { CoverComponent } from '../../core/components/cover/cover.component';
import { FollowersComponent } from './core/components/followers/followers.component';
import { FeelingsComponent } from './core/components/feelings/feelings.component';
import { UserDetailsComponent } from './core/components/user-details/user-details.component';

@NgModule({
  declarations: [Profile, UserComponent, SettingComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ToolbarComponent,
    CoverComponent,
    FollowersComponent,
    FeelingsComponent,
    UserDetailsComponent,
  ],
  providers: [provideState({ name: 'colors', reducer: colorReducer })],
})
export class ProfileModule {}
