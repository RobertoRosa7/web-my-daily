import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { actionProfileRequest } from './core/actions/profile.action';
import { actionProfileHappensRequest } from './core/actions/profile.happens.action';
import { selectorId } from './core/selectors/user.selector';
import { selectorTheme } from './core/selectors/color.selector';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { ListeningFollowResponse } from '../../interface/follow.interface';
import { actionSocketUserMetrics } from './core/actions/socketio.action';
import { actionUserFollowers } from './core/actions/user.action';
import { JsonMapProperties } from '../../core/decorators/json.decorator';

@Component({
  selector: 'app-profile',
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public userId$: Observable<string | undefined> = this.store.select(selectorId);
  protected platform = inject(PLATFORM_ID);
  protected socketio!: Socket;

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.socketio = io(environment.ws + '/profile');
      this.store.dispatch(actionProfileRequest());
      this.store.dispatch(actionProfileHappensRequest());

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
