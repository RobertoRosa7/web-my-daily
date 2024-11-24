import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, finalize, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../../types/profile/profile.type';
import { ProfileService } from '../../services/profile/profile.service';
import {
  actionProfileError,
  actionProfileSuccess,
  actionUserFollowSuccess,
} from '../../actions/profile/profile.action';
import { actionLoading } from '../../actions/auth/auth.action';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { userType } from '../../types/user/user.type';
import { acNameIdNok, acNameIdOk, acNicknameOk, acNicknameNok } from '../../actions/user/user.action';
import { User } from '../../interfaces/profile/profile.interface';
import { LocalStorageService } from '../../services/localstorages/localstorage.service';
import { AuthVars } from '../../interfaces/auth/auth.interface';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class ProfileEffect {
  private readonly action: Actions = inject(Actions);
  private readonly store: Store = inject(Store);
  private readonly profileService = inject(ProfileService);
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);

  private readonly userProfileFollow$ = createEffect(() =>
    this.action.pipe(
      // Layer - type of action
      ofType(profileType.userFollow),
      // Layer - concat service to following
      mergeMap((payload: FollowRequest) =>
        this.profileService.following(payload).pipe(
          // Layer - socketio to update real time
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
  private readonly profile$ = createEffect(() =>
    this.action.pipe(
      // Layer - type of action
      ofType(profileType.userProfile),
      // Layer - merge service to get userProfile
      mergeMap(() =>
        this.profileService.getUseProfile().pipe(
          // Layer - success
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
  private readonly changeNickName$ = createEffect(() =>
    this.action.pipe(
      // Layer - type of action
      ofType(userType.chNickname),
      // Layer - concat service to change nickname
      concatMap(({ nickname }) =>
        this.profileService.changeNickName(nickname).pipe(
          map((response) => {
            this.localStorage.setKey(AuthVars.user, { data: response.data });
            return acNicknameOk(response);
          }),
          catchError((error: HttpErrorResponse) =>
            of(acNicknameNok({ error, data: new User(), message: error.error.message }))
          )
        )
      )
    )
  );

  /**
   * Effect to handle nickname change.
   */
  private readonly changeNameId$ = createEffect(() =>
    this.action.pipe(
      // Layer - type of action
      ofType(userType.chNameId),
      // Layer concat service to change name id
      concatMap(({ nameId }) =>
        this.profileService.changeNameId(nameId).pipe(
          // Layer - success to change
          map((response) => acNameIdOk(response)),
          // Layer - error to change
          catchError((failure: HttpErrorResponse) => of(acNameIdNok({ failure })))
        )
      )
    )
  );
}
