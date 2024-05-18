import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../profile/core/selectors/color.selector';
import { selectorPageablePub } from '../profile/core/selectors/profile.selector';
import { map } from 'rxjs';
import { actionColor } from '../profile/core/actions/color.action';
import { stringType } from '../profile/core/types/color.type';
import { actionProfilePublic } from '../profile/core/actions/profile.action';

@Component({
  selector: 'app-home',
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class HomeComponent implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actionProfilePublic({ name: null }));
    this.store.dispatch(
      actionColor({
        theme: 'home',
        background: stringType.profileCover,
      })
    );
  }
}
