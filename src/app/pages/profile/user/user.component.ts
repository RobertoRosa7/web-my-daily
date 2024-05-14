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
import { Socket, io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { actionSocketUserMetrics } from '../core/actions/socketio.action';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { selectorId } from '../core/selectors/user.selector';
import { JsonMapProperties } from '../../../core/decorators/json.decorator';
import { ListeningFollowResponse } from '../../../interface/follow.interface';
import { actionUserFollowers } from '../core/actions/user.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends Profile implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public userId$: Observable<string | undefined> = this.store.select(selectorId);
  public userProfile$: ProfileObservable = this.store.select(selectorProfile);
  public profilePublic$: ProfilePublicObservable = this.store.select(isSelectorProfilePublic);
  public profileHappens$: ProfileHappenObservable = this.store.select(selectorHappens);

  private socketio!: Socket;
  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.store.dispatch(actionProfileRequest());
      this.store.dispatch(actionProfileHappensRequest());
      this.socketio = io(environment.ws + '/follows');

      this.userId$
        .pipe(
          tap((id) => this.socketio.emit('dispatch_following', id, id)),
          mergeMap((id) =>
            this.listeningFollows$().pipe(
              map((response) => JsonMapProperties.deserialize(ListeningFollowResponse, response)),
              filter((response: ListeningFollowResponse) => response.followId === id)
            )
          )
        )
        .subscribe({
          next: (data) => this.store.dispatch(actionUserFollowers(data)),
        });

      this.socketio.on('LISTENING_PUBLIC_PROFILE', (data) => {
        if (data) {
          this.store.dispatch(actionSocketUserMetrics(data));
        }
      });
    }

    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: stringType.profileCover,
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
