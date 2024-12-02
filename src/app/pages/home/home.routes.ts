import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { InitialComponent } from './initial/initial.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [],
    children: [
      { path: 'initial', component: InitialComponent },

      { path: '**', redirectTo: 'initial', pathMatch: 'prefix' },
    ],
  },
];
