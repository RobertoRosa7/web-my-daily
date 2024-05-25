import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HappenService } from '../../services/happens/happen.service';
import { likesTypes } from '../../types/happens/likes.type';
import { actionLikesError, likeSuccess } from '../../actions/happens/likes.action';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class LikeEffect {
  private readonly action: Actions = inject(Actions);
  private readonly happenService = inject(HappenService);

  /**
   * INFO:
   *
   * profile - layer 2 effect profile responsible to handler layer between services, store states, reducers and components
   */
  public like: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(likesTypes.likedPostRemote),
      mergeMap(({ request }) =>
        this.happenService.postLiked(request).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return actionLikesError({ failed: response });
            }
            return likeSuccess();
          })
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  public dislike: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(likesTypes.disLikedPostRemote),
      mergeMap(({ request }) =>
        this.happenService.postDisliked(request).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return actionLikesError({ failed: response });
            }
            return likeSuccess();
          })
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );
}
