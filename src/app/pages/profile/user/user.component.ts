import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { Store } from '@ngrx/store';
import { selectorProfile } from '../core/selectors/profile.selector';
import { ProfileHappenObservable } from '../../../core/interfaces/happens/profile.happen.interface';
import { selectorHappens } from '../../../core/selectors/happens/profile.happens.selector';
import { ProfileObservable } from '../core/interfaces/profile.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends Profile implements OnInit {
  public userProfile$: ProfileObservable = this.store.select(selectorProfile);
  public profileHappens$: ProfileHappenObservable = this.store.select(selectorHappens);

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {}
}
