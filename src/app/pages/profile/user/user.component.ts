import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { Store } from '@ngrx/store';
import { selectorProfile } from '../../../core/selectors/profile/profile.selector';
import { ProfileHappenObservable } from '../../../core/interfaces/happens/profile.happen.interface';
import { selectorHappens } from '../../../core/selectors/happens/profile.happens.selector';
import { ProfileObservable } from '../../../core/interfaces/profile/profile.interface';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { ListeningFollowResponse } from '../../../core/interfaces/follows/follow.interface';
import { actionSocketUserMetrics } from '../../../core/actions/socket/socketio.action';
import { acUsFollowers } from '../../../core/actions/user/user.action';
import { JsonMapProperties } from '../../../core/decorators/jsons/json.decorator';
import { isPlatformBrowser } from '@angular/common';
import { io } from 'socket.io-client';
import { actionProfileRequest } from '../../../core/actions/profile/profile.action';
import { happenRequest } from '../../../core/actions/happen/profile.happens.action';
import { environment } from '../../../../environments/environment';
import { actionColor } from '../../../core/actions/color/color.action';
import { backgroundType } from '../../../core/types/colors/color.type';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends Profile implements OnInit {
  public userProfile$: ProfileObservable = this.store.select(selectorProfile);
  public profileHappens$: ProfileHappenObservable = this.store.select(selectorHappens);

  constructor(protected override readonly store: Store) {
    super();
  }

  override ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.socketio = io(environment.ws + '/profile');
      this.store.dispatch(actionProfileRequest());
      this.store.dispatch(happenRequest());

      this.userId$
        .pipe(
          mergeMap((id) =>
            this.listeningFollows$().pipe(
              map((response) => JsonMapProperties.deserialize(ListeningFollowResponse, response)),
              filter(({ followId }: ListeningFollowResponse) => followId === id)
            )
          )
        )
        .subscribe({
          next: (data) => this.store.dispatch(acUsFollowers(data)),
        });

      this.socketio.on('listening_profile_metrics', (data) => {
        if (data) {
          this.store.dispatch(actionSocketUserMetrics(data));
        }
      });
    }
    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: backgroundType.profileCover,
      })
    );
  }

  public listeningFollows$() {
    return new Observable((observer: Observer<ListeningFollowResponse>) => {
      this.socketio.on('listening_following', (data) => {
        if (data) {
          observer.next(data);
        } else {
          observer.error('Unable To Reach Server');
        }
      });
      return () => this.socketio.disconnect();
    });
  }
}
