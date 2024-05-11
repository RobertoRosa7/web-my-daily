import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { Store } from '@ngrx/store';
import { actionColor } from '../core/actions/color.action';
import { selectorTheme } from '../core/selectors/color.selector';
import { stringType } from '../core/types/color.type';
import { isPlatformBrowser } from '@angular/common';
import { actionProfileRequest } from '../core/actions/profile.action';
import { selectorProfile, isSelectorProfilePublic } from '../core/selectors/profile.selector';
import { actionProfileHappensRequest } from '../core/actions/profile.happens.action';
import { ProfileHappenObservable } from '../core/interfaces/profile.happen.interface';
import { selectorHappens } from '../core/selectors/profile.happens.selector';
import { ProfileObservable, ProfilePublicObservable } from '../core/interfaces/profile.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends Profile implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public userProfile$: ProfileObservable = this.store.select(selectorProfile);
  public profilePublic$: ProfilePublicObservable = this.store.select(isSelectorProfilePublic);
  public profileHappens$: ProfileHappenObservable = this.store.select(selectorHappens);

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.store.dispatch(actionProfileRequest());
      this.store.dispatch(actionProfileHappensRequest());
    }

    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: stringType.profileCover,
      })
    );
  }
}
