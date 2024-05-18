import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { selectorId } from '../profile/core/selectors/user.selector';
import { Socket, io } from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';
import { JsonMapProperties } from '../../core/decorators/json.decorator';
import { ListeningFollowResponse } from '../../interface/follow.interface';
import { actionUserFollowers } from '../profile/core/actions/user.action';
import { environment } from '../../../environments/environment';
import { actionColor } from '../profile/core/actions/color.action';
import { stringType } from '../profile/core/types/color.type';
import { selectorTheme } from '../profile/core/selectors/color.selector';

@Component({
  selector: 'app-public',
  template: `
    <app-toolbar *ngIf="userId$ | async"></app-toolbar>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Public implements OnInit {
  public readonly theme$ = this.store.select(selectorTheme);
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);

  protected readonly platform = inject(PLATFORM_ID);
  protected socketio!: Socket;

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.socketio = io(environment.ws + '/profile');
      this.userId$
        .pipe(
          tap((id) => this.socketio.emit('dispatch_following', id, id)),
          mergeMap((id) =>
            this.listeningFollows$().pipe(
              map((response) => JsonMapProperties.deserialize(ListeningFollowResponse, response)),
              filter(({ userId }: ListeningFollowResponse) => userId === id)
            )
          )
        )
        .subscribe({
          next: (data) => this.store.dispatch(actionUserFollowers(data)),
        });
    }
    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: stringType.publicProfileCover,
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
