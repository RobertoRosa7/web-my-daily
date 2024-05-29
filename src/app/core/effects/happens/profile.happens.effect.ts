import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  happenCommentError,
  happenCommentSuccess,
  happenError,
  happenPostSuccess,
  happenSuccess,
  happenUpdateSuccess,
  happenVoid,
} from '../../actions/happens/profile.happens.action';
import { happenTypes } from '../../types/happens/happen.type';
import { HappenService } from '../../services/happens/happen.service';
import { commentTypes } from '../../types/happens/comment.type';
import {
  actionCommentError,
  happenCommentDeleteRemoteSuccess,
  happenCommentLocal,
  happenCommentPutSuccess,
} from '../../actions/happens/comment.action';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class HappensEffect {
  private readonly action: Actions = inject(Actions);
  private readonly happenService = inject(HappenService);

  /**
   * INFO:
   *
   * profile - layer 2 effect profile responsible to handler layer between services, store states, reducers and components
   */
  public happen: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(happenTypes.happens),
      // layer to fetch payload from action
      mergeMap(() =>
        // layer to service send payload to backend
        this.happenService.getHappens().pipe(
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
      ofType(happenTypes.happenDeleteRemote),
      // layer to fetch payload from action
      mergeMap(({ data }) =>
        // layer to service send payload to backend
        this.happenService.deleteHappen(data).pipe(
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
      ofType(happenTypes.happenUpdateRemote),
      mergeMap(({ data, index }) =>
        this.happenService.updateHappen(data).pipe(
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
      ofType(happenTypes.happenPostRemote),
      mergeMap(({ data, index }) =>
        this.happenService.postHappen(data).pipe(
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

  /**
   * INFO:
   *
   * timeline - layer 2 effect profile responsible to handler layer between services, store states, reducers and components
   */
  public timeline: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      ofType(happenTypes.getTimeline),
      mergeMap(() =>
        this.happenService.getTimeline().pipe(
          catchError((e) => of(e)),
          map((response) => {
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

  private callbackFindOneLocal() {
    return this.action.pipe(
      ofType(happenTypes.happenComments),
      // layer call service http
      mergeMap(({ data }) =>
        this.happenService.getHappenComments(data).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return happenCommentError({ failed: response });
            }
            return happenCommentSuccess(response);
          })
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    );
  }

  private callbackAddComments() {
    return this.action.pipe(
      ofType(commentTypes.commentPostRemote),
      mergeMap((payload) =>
        this.happenService.addHappenComments(payload).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return actionCommentError({ failed: response });
            }
            return happenCommentLocal(response);
          })
        )
      ),
      catchError((e) => of(e))
    );
  }
  private callbackPutComments() {
    return this.action.pipe(
      ofType(commentTypes.commentPutRemote),
      mergeMap(({ commentId, request }) =>
        this.happenService.updateHappenComments(commentId, request).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return actionCommentError({ failed: response });
            }
            return happenCommentPutSuccess(response);
          })
        )
      ),
      catchError((e) => of(e))
    );
  }

  private callbackDelComments() {
    return this.action.pipe(
      ofType(commentTypes.commentDeleteRemote),
      mergeMap(({ commentId }) =>
        this.happenService.deleteHappenComments(commentId).pipe(
          catchError((e) => of(e)),
          map((response) => {
            if (response instanceof HttpErrorResponse) {
              return actionCommentError({ failed: response });
            }
            return happenCommentDeleteRemoteSuccess({ commentId });
          })
        )
      ),
      catchError((e) => of(e))
    );
  }

  public getComments: Observable<Actions> = createEffect(() => this.callbackFindOneLocal());
  public addComments: Observable<Actions> = createEffect(() => this.callbackAddComments());
  public putComments: Observable<Actions> = createEffect(() => this.callbackPutComments());
  public delComments: Observable<Actions> = createEffect(() => this.callbackDelComments());
}
