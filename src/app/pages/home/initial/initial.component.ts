import { Component, OnInit } from '@angular/core';
import { selectorTheme } from '../../profile/core/selectors/color.selector';
import { HomeComponent } from '../home';
import { Store } from '@ngrx/store';
import { actionColor } from '../../profile/core/actions/color.action';
import { stringType } from '../../profile/core/types/color.type';
import { selectorPageablePub } from '../../profile/core/selectors/profile.selector';
import { map } from 'rxjs';
import { FollowRequest } from '../../../interface/follow.interface';
import { actionProfilePublic, actionUserFollow } from '../../profile/core/actions/profile.action';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent extends HomeComponent implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(actionProfilePublic({ name: null }));
    this.store.dispatch(
      actionColor({
        theme: 'home',
        background: stringType.profileCover,
      })
    );
  }

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }
}
