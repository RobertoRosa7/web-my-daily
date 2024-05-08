import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.services';
import * as authAction from '../actions/auth.action';
import { authType } from '../types/auth.type';
import { LocalStorageService } from '../../../../../services/localstorage.service';
import { Store } from '@ngrx/store';
import { AuthVars } from '../interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutePaths } from '../../../../core/enums/base.enum';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class AuthEffect {
  /**
   * INFO:
   * register - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public register: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(authType.LOGIN_REGISTER),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.authService.register(payload).pipe(
          // layer resolve http error to handler
          catchError((e) => of(e)),
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            if (response instanceof HttpErrorResponse) {
              return authAction.actionLoginError({ fail: response });
            }
            // dispatch action to home after login
            this.store.dispatch(authAction.actionGoto({ paths: [RoutePaths.login] }));
            return authAction.actionLoginSuccess(response);
          }),
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
      ofType(authType.LOGIN),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.authService.login(payload).pipe(
          // layer resolve http error to handler
          catchError((e) => of(e)),
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            if (response instanceof HttpErrorResponse) {
              return authAction.actionLoginError({ fail: response });
            }

            // layer to save on localstorage information from login after validate on backend
            this.localStorage.setKey(AuthVars.token, { data: response.data?.token });

            // layer to save on localstorage information from login after validate on backend
            this.localStorage.setKey(AuthVars.user, { data: response.data?.user });

            // dispatch action to home after register
            this.store.dispatch(authAction.actionGoto({ paths: [RoutePaths.register] }));
            return authAction.actionLoginSuccess(response);
          }),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(authAction.actionLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  constructor(
    private readonly action: Actions,
    private readonly authService: AuthService,
    private readonly localStorage: LocalStorageService,
    private readonly store: Store
  ) {}
}
