import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../types/profile.type';
import { ProfileService } from '../services/profile.service';
import {
  happenError,
  happenPostSuccess,
  happenSuccess,
  happenUpdateSuccess,
  happenVoid,
} from '../actions/profile.happens.action';

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
      ofType(profileType.happens),
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
              return happenError({ failed: response });
            }
            return happenSuccess(response);
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
      ofType(profileType.happenDeleteRemote),
      // layer to fetch payload from action
      mergeMap(({ data }) =>
        // layer to service send payload to backend
        this.profileService.deleteHappen(data).pipe(
          // layer resolve http error to handler
          catchError((e) => of(e)),
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            if (response instanceof HttpErrorResponse) {
              return happenError({ failed: response });
            }

            return happenVoid();
          })
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  public updateHappen: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(profileType.happenUpdateRemote),
      mergeMap(({ data, index }) =>
        this.profileService.updateHappen(data).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return happenError({ failed: response });
            }
            return happenUpdateSuccess({ index, data: response.data });
          })
        )
      ),
      catchError((e) => of(e))
    )
  );

  public postHappen: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(profileType.happenPostRemote),
      mergeMap(({ data, index }) =>
        this.profileService.postHappen(data).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return happenError({ failed: response });
            }
            return happenPostSuccess({ index, data: response.data });
          })
        )
      ),
      catchError((e) => of(e))
    )
  );
}
