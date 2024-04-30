import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.services';
import * as actionAuth from '../action/auth.action';
import { LocalStorageService } from '../../../../../services/localstorage.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffect {
  /**
   * INFO:
   * register - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public register: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(actionAuth.actionRegiser),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.authService.register(payload).pipe(
          // layer resolve http error to handler
          catchError((e) => {
            // dispatch error to component handler on display
            this.store.dispatch(actionAuth.actionLoginError({ error: e }));
            // stopping and interupt runtime
            return throwError(() => new Error(e));
          }),
          // layer to save on localstorage information from login after validate on backend
          tap(({ data }) => this.localStorage.setKey('token', { data })),
          // layer map when login made success
          map((response) => actionAuth.actionLoginSuccess(response))
        )
      ),
      // layer to catch error from effect
      catchError((err) => of(err))
    )
  );

  /**
   * INFO:
   * login - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public login: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(actionAuth.actionLogin),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.authService.login(payload).pipe(
          // layer resolve http error to handler
          catchError((e) => {
            // dispatch error to component handler on display
            this.store.dispatch(actionAuth.actionLoginError({ error: e }));
            // stopping and interupt runtime
            return throwError(() => new Error(e));
          }),
          // layer to save on localstorage information from login after validate on backend
          tap(({ data }) => this.localStorage.setKey('token', { data })),
          // layer map when login made success
          map((response) => actionAuth.actionLoginSuccess(response))
        )
      ),
      // layer to catch error from effect
      catchError((err) => of(err))
    )
  );

  constructor(
    private readonly action: Actions,
    private readonly authService: AuthService,
    private readonly localStorage: LocalStorageService,
    private readonly store: Store
  ) {}
}
