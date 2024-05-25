import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../core/selectors/colors/color.selector';
import { actionColor } from '../profile/core/actions/color.action';
import { selectorId } from '../profile/core/selectors/user.selector';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { actionProfilePublic } from '../public/core/actions/public-profile.action';
import { happenRequest } from '../../core/actions/happens/profile.happens.action';
import { backgroundType } from '../../core/types/colors/color.type';

@Component({
  selector: 'app-home',
  template: `
    <app-toolbar [id]="userId$ | async" />
    <router-outlet></router-outlet>
    <app-button-fab-create />
  `,
})
export class HomeComponent implements OnInit {
  public readonly theme$ = this.store.select(selectorTheme);
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);
  protected readonly platform = inject(PLATFORM_ID);

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.store.dispatch(actionProfilePublic({ name: null }));
    }
    this.store.dispatch(
      actionColor({
        theme: 'home timeline',
        background: backgroundType.socialHub,
      })
    );
  }
}
