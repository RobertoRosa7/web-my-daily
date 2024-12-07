import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { profileType } from '../../types/public/public-profile.type';
import { PublicProfileService } from '../../services/public/public-profile.service';
import { actionProfileError, actionProfileSuccess } from '../../actions/public/public-profile.action';
import { Effect } from '@effects/effect';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class PublicProfileEffect extends Effect {
  private readonly action: Actions = inject(Actions);
  private readonly profileService = inject(PublicProfileService);

  /**
   * profilePublic - responsilbe to fetch Pageable or Single public profile of user
   */
  public profilePublic$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(profileType.USER_PROFILE_PUBLIC),
      mergeMap(({ name }) =>
        this.profileService.getProfilePublic(name).pipe(
          // Layer - sucess profile public suer
          map((response) => actionProfileSuccess(response)),
          // Layer - Error show message
          catchError((e) => this.handlerError(e)),
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );
}
