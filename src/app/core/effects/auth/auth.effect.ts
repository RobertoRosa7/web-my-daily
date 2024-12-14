import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.services';
import * as authAction from '../../actions/auth/auth.action';
import { AuthType } from '../../types/auth/auth.type';
import { AuthVars } from '../../interfaces/auth/auth.interface';
import { RoutePathsEnum } from '../../enums/bases/base.enum';
import { Effect } from '@effects/effect';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class AuthEffect extends Effect {
  private readonly action: Actions = inject(Actions);
  private readonly authService: AuthService = inject(AuthService);

  /**
   * INFO:
   * register - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public register: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(AuthType.LOGIN_REGISTER),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.authService.register(payload).pipe(
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            this.showMessage(response.message as string, 'success');

            // dispatch action to home after login
            this.store.dispatch(authAction.actionGoto({ paths: [RoutePathsEnum.routeLogin] }));

            return authAction.actionLoginSuccess(response);
          }),
          // layer resolve http error to handler
          catchError((e) => this.handlerError(e)),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(authAction.actionLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  /**
   * INFO:
   * login - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public login: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(AuthType.LOGIN),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.authService.login(payload).pipe(
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            this.showMessage(response.message as string, 'success');

            // layer to save on localstorage information from login after validate on backend
            this.authService.setKey(AuthVars.token, { data: response.data?.token });

            // layer to save on localstorage information from login after validate on backend
            this.authService.setKey(AuthVars.user, { data: response.data?.user });

            // dispatch action to home after register
            this.store.dispatch(authAction.actionGoto({ paths: [RoutePathsEnum.routeHome] }));

            return authAction.actionLoginSuccess(response);
          }),
          // layer resolve http error to handler
          catchError((e) => this.handlerError(e)),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(authAction.actionLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );
}
