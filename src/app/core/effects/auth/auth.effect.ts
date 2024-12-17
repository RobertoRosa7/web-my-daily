import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.services';
import * as authAction from '@actions/auth/auth.action';
import { AuthType } from '../../types/auth/auth.type';
import { AuthVars } from '@interfaces/auth/auth.interface';
import { RoutePathsEnum } from '@enums/bases/base.enum';
import { Effect } from '@effects/effect';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class AuthEffect extends Effect {
  private readonly action: Actions = inject(Actions);
  private readonly authService: AuthService = inject(AuthService);

  /**
   * register - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public register$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(AuthType.authRegiterType),
      // layer to fetch payload from action
      mergeMap((payload) =>
        // layer to service send payload to backend
        this.authService.register(payload).pipe(
          // layer map when login made success
          map((response) => {
            // check if response if http error and then dispatch action of error
            this.showMessage(response.message as string, 'success');

            // dispatch action to home after login
            this.store.dispatch(authAction.acGoto({ paths: [RoutePathsEnum.routeLogin] }));

            return authAction.acLoginSuccess(response);
          }),
          // layer resolve http error to handler
          catchError((e) => this.handlerError(e)),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(authAction.acLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  /**
   * login - effect login effect responsible to handler layer between services, store states, reducers and components
   */
  public login$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(AuthType.authLoginType),
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
            this.store.dispatch(authAction.acGoto({ paths: [RoutePathsEnum.routeHome] }));

            return authAction.acLoginSuccess(response);
          }),
          // layer resolve http error to handler
          catchError((e) => this.handlerError(e)),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(authAction.acLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  /**
   *
   */
  public resetPassword$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(AuthType.authSendEmailType),
      // layer to fetch payload from action
      mergeMap((request) =>
        this.authService.resetPassword(request).pipe(
          map((response) => {
            // check if response if http error and then dispatch action of error
            this.showMessage(response.message as string, 'success');

            return authAction.acSendEmailOk(response);
          }),
          // Layer - error
          catchError((e) => this.handlerError(e)),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(authAction.acLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  /**
   *
   */
  public createPassword$: Observable<Actions> = createEffect(() =>
    this.action.pipe(
      // layer types to dispatch action
      ofType(AuthType.authCreatePassType),
      // layer to fetch payload from action
      mergeMap((request) =>
        // layer to fetch payload from action
        this.authService.createPassword(request).pipe(
          map((response) => {
            // check if response if http error and then dispatch action of error
            this.showMessage(response.message as string, 'success');

            return authAction.acCreatePassOk(response);
          }),
          // Layer - error
          catchError((e) => this.handlerError(e)),
          // layer finalize stopping loading
          finalize(() => this.store.dispatch(authAction.acLoading({ isLoading: false })))
        )
      ),
      // layer to catch error from effect
      catchError((e) => of(e))
    )
  );

  // /**
  //  * Create an RxJS UnaryFunction pipeline with typed response.
  //  * This ensures generic support for mapping and error handling.
  //  */
  // private createEffectPipeline<T>(acSuccess: (response: T) => Actions): UnaryFunction<Observable<T>, Observable<T>> {
  //   return pipe(
  //     // layer to fetch payload from action
  //     map((response: T) => {
  //       this.showMessage((response as HttpResponseDefault<T>).message as string, 'success'); // Adjust if message exists in a specific format
  //       return acSuccess(response);
  //     }),
  //     // Layer - error
  //     catchError((error) => this.handlerError(error)),
  //     // layer finalize stopping loading
  //     finalize(() => this.store.dispatch(authAction.acLoading({ isLoading: false })))
  //   );
  // }
}
