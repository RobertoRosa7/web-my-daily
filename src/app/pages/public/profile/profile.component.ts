import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Public } from '../public';
import { selectorTheme } from '../../profile/core/selectors/color.selector';
import { actionColor } from '../../profile/core/actions/color.action';
import { stringType } from '../../profile/core/types/color.type';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, delay, filter, map, mergeMap, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { actionProfilePublic, actionUserFollow } from '../../profile/core/actions/profile.action';
import { selectorPageablePub, selectorUserPub } from '../../profile/core/selectors/profile.selector';
import { selectorId } from '../../profile/core/selectors/user.selector';
import { FollowRequest, ListeningFollowResponse } from '../../../interface/follow.interface';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { JsonMapProperties } from '../../../core/decorators/json.decorator';
import { actionUserFollowers } from '../../profile/core/actions/user.action';
import { pageableProfilePublicMock } from '../../../mock/profile.mock';
import { User } from '../../profile/core/interfaces/profile.interface';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends Public implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public mock = pageableProfilePublicMock as Array<User>;
  public userId$: Observable<string | undefined> = this.store.select(selectorId);
  public userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));
  public userProfile$ = this.store.select(selectorUserPub);

  private platform = inject(PLATFORM_ID);
  private socketio!: Socket;

  constructor(protected override readonly store: Store, private readonly activeRoute: ActivatedRoute) {
    super(store);
  }

  override ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.socketio = io(environment.ws + '/follows');
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

    this.activeRoute.queryParamMap.subscribe((params) =>
      this.store.dispatch(actionProfilePublic({ name: params.get('name') }))
    );

    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: stringType.publicProfileCover,
      })
    );
  }

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
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
