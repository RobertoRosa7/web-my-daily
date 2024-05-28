import { Component } from '@angular/core';
import { HomeComponent } from '../home';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { FollowRequest, ListeningFollowResponse } from '../../../core/interfaces/follows/follow.interface';
import { selectorPageablePub } from '../../profile/core/selectors/profile.selector';
import { actionUserFollow } from '../../public/core/actions/public-profile.action';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { JsonMapProperties } from '../../../core/decorators/jsons/json.decorator';
import { actionUserFollowers } from '../../profile/core/actions/user.action';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent extends HomeComponent {
  public readonly userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {}

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }
}
