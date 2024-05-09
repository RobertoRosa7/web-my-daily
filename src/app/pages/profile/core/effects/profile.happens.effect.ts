import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../types/profile.type';
import { ProfileService } from '../services/profile.service';
import { actionLoading } from '../../../auth/core/actions/auth.action';
import { actionProfileHappensError, actionProfileHappensSuccess } from '../actions/profile.happens.action';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class ProfileHappensEffect {
  private readonly action: Actions = inject(Actions);
  private readonly store: Store = inject(Store);
  private readonly profileService = inject(ProfileService);

  /**
   * INFO:
   * 
   * profile - layer 2 effect profile responsible to handler layer between services, store states, reducers and components
   */
  public profile: Observable<Actions> = createEffect(() =>
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
              return actionProfileHappensError({ error: response });
            }
            // dispatch action to home after login
            // this.store.dispatch(authAction.actionGoto({ paths: [RoutePaths.login] }));
            return actionProfileHappensSuccess(response);
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
