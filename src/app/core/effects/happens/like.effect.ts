import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HappenService } from '../../services/happens/happen.service';
import { likesTypes } from '../../types/happens/likes.type';
import { actionLikesError, likeSuccess } from '../../actions/happens/likes.action';
import { environment } from '../../../../environments/environment';
import { io } from 'socket.io-client';
import { LikeHttpResponse, LikeRequest } from '../../interfaces/happens/profile.happen.interface';
import { selectorId } from '../../../pages/profile/core/selectors/user.selector';

type response = HttpErrorResponse | LikeHttpResponse;

import { Store } from '@ngrx/store';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class LikeEffect {
  private readonly action: Actions = inject(Actions);
  private readonly happenService = inject(HappenService);
  private readonly store = inject(Store);

  private handlerWithResponse(response: response, request: LikeRequest) {
    return this.store.select(selectorId).pipe(
      map((id) => {
        if (response instanceof HttpErrorResponse) {
          return actionLikesError({ failed: response });
        }

        // verify if card happen is not my own card
        if (id !== request.happenOwnerId) {
          const socketio = io(environment.ws + '/likes');
          socketio.emit('dispatch_likes', request.happenId, request.happenOwnerId);
        }

        return likeSuccess(response.data);
      })
    );
  }

  /**
   * INFO:
   *
   * profile - layer 2 effect profile responsible to handler layer between services, store states, reducers and components
   */
  public like: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(likesTypes.likedPostRemote),
      mergeMap(({ request }: any) =>
        this.happenService.postLiked(request).pipe(
          catchError((e) => of(e)),
          exhaustMap((response: response) => this.handlerWithResponse(response, request))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  public dislike: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(likesTypes.disLikedPostRemote),
      mergeMap(({ request }: any) =>
        this.happenService.postDisliked(request).pipe(
          catchError((e) => of(e)),
          exhaustMap((response: response) => this.handlerWithResponse(response, request))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );
}
