import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, finalize, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../types/profile.type';
import { ProfileService } from '../services/profile.service';
import { actionProfileError, actionProfileSuccess, actionUserFollowSuccess } from '../actions/profile.action';
import { actionLoading } from '../../../auth/core/actions/auth.action';
import { io } from 'socket.io-client';
import { environment } from '../../../../../environments/environment';
import { FollowRequest } from '../../../../core/interfaces/follows/follow.interface';
import { userType } from '../types/user.type';
import { actionChangeNickNameOk, actionChangeNicknameNok } from '../actions/user.action';
import { User } from '../interfaces/profile.interface';
import { LocalStorageService } from '../../../../core/services/localstorages/localstorage.service';
import { AuthVars } from '../../../auth/core/interfaces/auth.interface';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class ProfileEffect {
  private readonly action: Actions = inject(Actions);
  private readonly store: Store = inject(Store);
  private readonly profileService = inject(ProfileService);
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);

  public userProfileFollow$ = createEffect(() =>
    this.action.pipe(
      ofType(profileType.userFollow),
      mergeMap((payload: FollowRequest) =>
        this.profileService.following(payload).pipe(
          map(() => {
            const socketio = io(environment.ws + '/profile');
            socketio.emit(payload.ev, payload.followingId, payload.userId);
            return actionUserFollowSuccess(payload);
          }),
          catchError((error) => of(actionProfileError({ error })))
        )
      )
    )
  );

  /**
   * INFO:
   * register - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public profile$ = createEffect(() =>
    this.action.pipe(
      ofType(profileType.userProfile),
      mergeMap(() =>
        this.profileService.getUseProfile().pipe(
          map((response) => actionProfileSuccess(response)),
          catchError((error: HttpErrorResponse) => of(actionProfileError({ error }))),
          finalize(() => this.store.dispatch(actionLoading({ isLoading: false })))
        )
      )
    )
  );

  /**
   * Effect to handle nickname change.
   */
  public changeNickName$ = createEffect(() =>
    this.action.pipe(
      ofType(userType.userChangeNickName),
      concatMap(({ nickname }) =>
        this.profileService.changeNickName(nickname).pipe(
          map((response) => {
            this.localStorage.setKey(AuthVars.user, { data: response.data });
            return actionChangeNickNameOk(response);
          }),
          catchError((error: HttpErrorResponse) =>
            of(actionChangeNicknameNok({ error, data: new User(), message: error.error.message }))
          )
        )
      )
    )
  );
}
