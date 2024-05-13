import { NgModule } from '@angular/core';
import { HomeComponent } from './home';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { provideState } from '@ngrx/store';
import { colorReducer } from '../profile/core/reducers/color.reducer';
import { CommonModule } from '@angular/common';
import { InitialComponent } from './initial/initial.component';
import { CoverComponent } from '../../core/components/cover/cover.component';
import { SharedModule } from '../../shared/shared.module';
import { InitialExploreComponent } from './core/components/initial-explore/initial-explore.component';
import { InitialFeelingsComponent } from './core/components/initial-feelings/initial-feelings.component';
import { InitialMainComponent } from './core/components/initial-main/initial-main.component';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ToolbarComponent,
    CommonModule,
    CoverComponent,
    SharedModule,
    InitialExploreComponent,
    InitialFeelingsComponent,
    InitialMainComponent,
  ],
  declarations: [HomeComponent, InitialComponent],
  providers: [provideState({ name: 'colors', reducer: colorReducer })],
})
export class HomeModule {}
