import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { Socket } from 'socket.io-client';
import { ListeningFollowResponse } from '../../interfaces/follow.interface';
import { selectorTheme } from '../../core/selectors/color.selector';
import { selectorId } from '../profile/core/selectors/user.selector';

@Component({
  selector: 'app-public',
  template: `
    <app-toolbar></app-toolbar>
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
    // if (isPlatformBrowser(this.platform)) {
    //   this.socketio = io(environment.ws + '/profile');
    //   this.userId$
    //     .pipe(
    //       tap((id) => this.socketio.emit('dispatch_following', id, id)),
    //       mergeMap((id) =>
    //         this.listeningFollows$().pipe(
    //           map((response) => JsonMapProperties.deserialize(ListeningFollowResponse, response)),
    //           filter(({ userId }: ListeningFollowResponse) => userId === id)
    //         )
    //       )
    //     )
    //     .subscribe({
    //       next: (data) => this.store.dispatch(actionUserFollowers(data)),
    //     });
    // }
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
