import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../types/profile.type';
import { ProfileService } from '../services/profile.service';
import { actionProfileError, actionProfileSuccess, actionUserFollowSuccess } from '../actions/profile.action';
import { actionLoading } from '../../../auth/core/actions/auth.action';
import { io } from 'socket.io-client';
import { environment } from '../../../../../environments/environment';
import { FollowRequest } from '../../../../interface/follow.interface';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class ProfileEffect {
  private readonly action: Actions = inject(Actions);
  private readonly store: Store = inject(Store);
  private readonly profileService = inject(ProfileService);

  /**
   * INFO:
   * profilePublic - responsilbe to fetch Pageable or Single public profile of user
   */
  public profilePublic$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(profileType.USER_PROFILE_PUBLIC),
      mergeMap(({ name }) =>
        this.profileService.getProfilePublic(name).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return actionProfileError({ error: response });
            }
            return actionProfileSuccess(response);
          })
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  public userProfileFollow$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(profileType.USER_FOLLOW),
      mergeMap((payload: FollowRequest) =>
        this.profileService.following(payload).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return actionProfileError({ error: response });
            }

            const socketio = io(environment.ws + '/profile');
            socketio.emit(payload.ev, payload.followingId, payload.userId);
            return actionUserFollowSuccess(payload);
          })
        )
      ),
      catchError((e) => of(e))
    )
  );

  /**
   * INFO:
   * register - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public profile$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(profileType.USER_PROFILE),
      // layer to fetch payload from action
      mergeMap(() =>
        // layer to service send payload to backend
        this.profileService.getUseProfile().pipe(
          // layer resolve http error to handler
          catchError((e) => of(e)),
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            if (response instanceof HttpErrorResponse) {
              return actionProfileError({ error: response });
            }
            // dispatch action to home after login
            // this.store.dispatch(authAction.actionGoto({ paths: [RoutePaths.login] }));
            return actionProfileSuccess(response);
          }),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(actionLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );
}
