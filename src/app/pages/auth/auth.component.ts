import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as selectAuth from './core/selectors/auth.selector';
import { Observable, Subscription, delay, filter, from, map, mergeMap } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { IAuthState } from './core/interfaces/auth.interface';
import { HttpResponseDefault } from '../../interface/http-response.interface';
import { actionClear, actionRegiser, actionLogin, actionGoto, actionLoading } from './core/actions/auth.action';
import { authType } from './core/types/auth.type';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>',
})
export class AuthComponent implements OnDestroy {
  public form!: FormGroup;
  public isLoading$!: Observable<boolean>;
  public subscriptions: Array<Subscription> = [];

  // responsible to listening actions to login success
  public message$: Observable<HttpResponseDefault<IAuthState>> = this.store
    // layer selector to filter
    .select(selectAuth.selectorMessage);

  // inject action subject dependency only super class?
  private actionSubject = inject(ActionsSubject);
  private router = inject(Router);
  private authService = inject(AuthService);
  private platform = inject(PLATFORM_ID);

  constructor(protected readonly store: Store<IAuthState>) {
    // clear previous session
    if (isPlatformBrowser(this.platform)) {
      this.authService.clearSession();
    }

    // listening action loading happens
    this.isLoading$ = this.actionSubject.pipe(
      // layer filer only action loading
      filter(({ type }) => type === authType.LOGIN_LOADING),
      // layer map catch payload action loading
      map((action) => {
        // abastract loading from action types
        const { isLoading } = action as { type: string; isLoading: boolean };

        // return loading
        return isLoading;
      })
    );

    // after login send to home
    this.subscriptions.push(
      this.actionSubject
        .pipe(
          filter(({ type }) => type === authType.LOGIN_GOTO),
          // layer map to return message on display
          map((action) => {
            // abstract paths to navigate
            const { paths } = action as { type: string; paths: Array<string> };

            // return data to display message
            return paths;
          }),
          // layer wait 1500 ms and then got
          delay(1500),
          // layer navigate
          mergeMap(this.navigate.bind(this))
        )
        .subscribe()
    );
  }

  /**
   * INFO:
   * ngOnDestroy - destory component
   */
  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  public onFireEvent(field: string, form: FormControl) {
    // this.disabledButton = Object.values(this.valid).some((value) => value);
    this.form.addControl(field, form);
  }

  /**
   * INFO:
   * navigate - responsible to go to some page
   *
   * @param paths Array<string> paths to navigate
   */
  private navigate(paths: Array<string>): Observable<boolean> {
    // clear fields message on display
    this.store.dispatch(this.clearAction());

    // navigate
    return from(this.router.navigate(paths));
  }

  /**
   * INFO:
   * getEmail = get name field from form
   */
  public get getEmail() {
    return this.form.get('email')?.value;
  }
  /**
   * INFO:
   * getPassword = get name field from form
   */
  public get getPassword() {
    return this.form.get('password')?.value;
  }
  /**
   * INFO:
   * getNickName = get name field from form
   */
  public get getNickName() {
    return this.form.get('nickname')?.value;
  }

  /**
   * INFO:
   * getNameId = get name field from form
   */
  public get getNameId() {
    return this.form.get('nameId')?.value;
  }

  /**
   * INFO:
   * getCheckTerms = get name field from form
   */
  public get getCheckTerms() {
    return this.form.get('checkTerms')?.value;
  }

  /**
   * INFO:
   * clearAction = reset message on display
   */
  public get clearAction() {
    return actionClear;
  }

  /**
   * INFO:
   * loginAction = dispatch action to make login
   */
  public get loginAction() {
    return actionLogin;
  }

  /**
   * INFO:
   * registerActioln = dispath action to make register
   */
  public get registerActioln() {
    return actionRegiser;
  }

  /**
   * INFO:
   * registerActioln = dispath action to make register
   */
  public get goToAction() {
    return actionGoto;
  }

  /**
   * INFO:
   * registerActioln = dispath action to make register
   */
  public get loading() {
    return actionLoading;
  }
}
