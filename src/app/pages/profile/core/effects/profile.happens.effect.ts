import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../types/profile.type';
import { ProfileService } from '../services/profile.service';
import { actionProfileHappensError, actionProfileHappensSuccess } from '../actions/profile.happens.action';
import { actionProfileRequest } from '../actions/profile.action';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class ProfileHappensEffect {
  private readonly action: Actions = inject(Actions);
  private readonly profileService = inject(ProfileService);

  /**
   * INFO:
   *
   * profile - layer 2 effect profile responsible to handler layer between services, store states, reducers and components
   */
  public happen: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(profileType.USER_PROFILE_HAPPENS),
      // layer to fetch payload from action
      mergeMap(() =>
        // layer to service send payload to backend
        this.profileService.getHappens().pipe(
          // layer resolve http error to handler
          catchError((e) => of(e)),
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            if (response instanceof HttpErrorResponse) {
              return actionProfileHappensError({ failed: response });
            }
            // dispatch action to home after login
            // this.store.dispatch(authAction.actionGoto({ paths: [RoutePaths.login] }));
            return actionProfileHappensSuccess(response);
          })
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  /**
   * INFO:
   *
   * profile - layer 2 effect profile responsible to handler layer between services, store states, reducers and components
   */
  public deleteHappen: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(profileType.USER_PROFILE_HAPPENS_DELETE_REMOTE),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.profileService.deleteHappen(payload).pipe(
          // layer resolve http error to handler
          catchError((e) => of(e)),
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            if (response instanceof HttpErrorResponse) {
              return actionProfileHappensError({ failed: response });
            }

            return actionProfileRequest();
          })
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );
}
