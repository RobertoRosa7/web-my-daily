import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { actionProfileRequest } from './core/actions/profile.action';
import { happenRequest } from '../../core/actions/happens/profile.happens.action';
import { selectorId } from './core/selectors/user.selector';
import { selectorTheme } from '../../core/selectors/colors/color.selector';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { ListeningFollowResponse } from '../../core/interfaces/follows/follow.interface';
import { actionSocketUserMetrics } from './core/actions/socketio.action';
import { actionUserFollowers } from './core/actions/user.action';
import { JsonMapProperties } from '../../core/decorators/jsons/json.decorator';
import { actionColor } from './core/actions/color.action';
import { backgroundType } from '../../core/types/colors/color.type';

@Component({
  selector: 'app-profile',
  template: `
    <app-toolbar [id]="userId$ | async"></app-toolbar>
    <router-outlet></router-outlet>
    <app-button-fab-create />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  public readonly theme$ = this.store.select(selectorTheme);
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);

  protected readonly platform = inject(PLATFORM_ID);
  protected socketio!: Socket;

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.socketio = io(environment.ws + '/profile');
      this.store.dispatch(actionProfileRequest());
      this.store.dispatch(happenRequest());

      this.userId$
        .pipe(
          tap((id) => this.socketio.emit('dispatch_following', id, id)),
          mergeMap((id) =>
            this.listeningFollows$().pipe(
              map((response) => JsonMapProperties.deserialize(ListeningFollowResponse, response)),
              filter(({ followId }: ListeningFollowResponse) => followId === id)
            )
          )
        )
        .subscribe({
          next: (data) => this.store.dispatch(actionUserFollowers(data)),
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
