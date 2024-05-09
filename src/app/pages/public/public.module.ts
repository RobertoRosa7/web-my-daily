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

@NgModule({
  declarations: [Public, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CoverComponent,
    FollowersComponent,
    UserDetailsComponent,
    Page404Component,
  ],
})
export class PublicModule {}
