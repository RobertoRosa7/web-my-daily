import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, finalize, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../../types/profile/profile.type';
import { ProfileService } from '../../services/profile/profile.service';
import { acErrProfile, acSusProfile, acUseFollowSuccess } from '../../actions/profile/profile.action';
import { actionLoading } from '../../actions/auth/auth.action';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { userType } from '../../types/user/user.type';
import { acNameIdOk, acNicknameOk } from '../../actions/user/user.action';
import { LocalStorageService } from '../../services/localstorages/localstorage.service';
import { AuthVars } from '../../interfaces/auth/auth.interface';
import { HttpUserResponse } from '@interfaces/profile/profile.interface';
import { Effect } from '@effects/effect';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class ProfileEffect extends Effect {
  private readonly action: Actions = inject(Actions);

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
            // const socketio = io(environment.ws + '/profile');
            // socketio.emit(payload.ev, payload.followingId, payload.userId);
            return acUseFollowSuccess(payload);
          }),
          // Layer - HttpErrorResponse
          catchError((error) => of(acErrProfile({ error })))
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
          map((response) => acSusProfile(response)),
          // Layer - HttpErrorResponse
          catchError((error: HttpErrorResponse) => of(acErrProfile({ error }))),
          // Layer - finalize loading
          finalize(() => this.store.dispatch(actionLoading({ isLoading: false })))
        )
      )
    )
  );

  /**
   * Effect to handle nickname change.
   */
  public readonly changeNickName$ = createEffect(() =>
    this.action.pipe(
      // Layer - type of action
      ofType(userType.chNickname),
      // Layer - concat service to change nickname
      concatMap(({ nickname }) => this.handlerChangeNickname(nickname)) // fast delete to handler
    )
  );

  /**
   * Effect to handle nickname change.
   */
  public readonly changeNameId$ = createEffect(() =>
    this.action.pipe(
      // Layer - type of action
      ofType(userType.chNameId), // listen for the nickname change action
      // Layer concat service to change name id
      concatMap(
        ({ nameId }) => this.handlerChangeNameId(nameId) // Delegate processing to a helper
      )
    )
  );

  /**
   * Processes the changeNameId action.
   * @param nickname The new nameId to be updated.
   */
  private handlerChangeNickname(nickname: string) {
    this.showMessage('atualizando...', 'info');

    return this.profileService.changeNickName(nickname).pipe(
      // Layer - handler success nickname
      map((response) => this.handlerSuccessNickname(response)),
      // Layer - HttpErrorResponse
      catchError((failure: HttpErrorResponse) => this.handlerError(failure)),
      // Layer - finalize loading
      finalize(() => this.store.dispatch(actionLoading({ isLoading: false })))
    );
  }

  /**
   * Processes the nickname when http response were success
   * @param response HttpUserResponse
   */
  private handlerSuccessNickname(response: HttpUserResponse) {
    this.localStorage.setKey(AuthVars.user, { data: response.data });

    // dispatch action show message success on display
    this.showMessage(response.message as string, 'success');

    // dispatch action ok
    return acNicknameOk(response);
  }

  /**
   * Processes the changeNameId action.
   * @param nameId The new nameId to be updated.
   */
  private handlerChangeNameId(nameId: string) {
    this.store.dispatch(actionLoading({ isLoading: true })); // Dispatch loading action

    return this.profileService.changeNameId(nameId).pipe(
      // Layer - success to change
      map((response) => {
        // dispatch action show message success on display
        this.showMessage(response.message as string, 'success');

        return acNameIdOk(response);
      }),
      // Layer - HttpErrorResponse
      catchError((error: HttpErrorResponse) => this.handlerError(error)),
      // Layer - finalize loading
      finalize(() => this.store.dispatch(actionLoading({ isLoading: false })))
    );
  }
}
