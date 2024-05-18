import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Public } from '../public';
import { map } from 'rxjs';
import { actionProfilePublic, actionUserFollow } from '../../profile/core/actions/profile.action';
import { selectorPageablePub } from '../../profile/core/selectors/profile.selector';
import { FollowRequest } from '../../../interface/follow.interface';
import { pageableProfilePublicMock } from '../../../mock/profile.mock';
import { User } from '../../profile/core/interfaces/profile.interface';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends Public implements OnInit {
  public readonly mock = pageableProfilePublicMock as Array<User>;
  public readonly userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(actionProfilePublic({ name: null }));
  }

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }
}
