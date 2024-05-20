import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../types/public-profile.type';
import { PublicProfileService } from '../services/public-profile.service';
import { actionProfileError, actionProfileSuccess } from '../actions/public-profile.action';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class PublicProfileEffect {
  private readonly action: Actions = inject(Actions);
  private readonly store: Store = inject(Store);
  private readonly profileService = inject(PublicProfileService);

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
}
