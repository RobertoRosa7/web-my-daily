import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as selectAuth from './core/selector/auth.selector';
import { Observable, exhaustMap, filter, map } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { IAuthState } from './core/interface/auth.interface';
import { HttpResponseDefault } from '../../interface/http-response.interface';
import { actionClear, actionRegiser, actionLogin, actionGoto, actionLoading } from './core/action/auth.action';
import { authType } from './core/type/auth.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>',
})
export class AuthComponent {
  public form!: FormGroup;
  public domainSuffix = '@daily';
  public changeTexts = true;
  public isLoading$!: Observable<boolean>;

  // responsible to listening actions to login success
  public loginResponse$: Observable<HttpResponseDefault<IAuthState>> = this.store
    // layer selector to filter
    .select(selectAuth.selectorSuccess)
    .pipe(
      // layer filter if exists data
      filter(({ data }) => !!data),
      // layer exhuastMap only go through if data exists
      exhaustMap((data) =>
        // layer subject to listening action login to go
        this.actionSubject.pipe(
          filter(({ type }) => type === authType.LOGIN_GOTO),
          // layer map to return message on display
          map((action) => {
            // abstract paths to navigate
            const { paths } = action as { type: string; paths: Array<string> };

            // navigate after login
            this.navigate(paths);

            // return data to display message
            return data;
          })
        )
      )
    );

  // responsible to listening some error
  public error$: Observable<HttpResponseDefault<void>> = this.store
    .select(selectAuth.selectorError)
    .pipe(filter(({ data }) => !data));

  // inject action subject dependency only super class?
  private actionSubject = inject(ActionsSubject);
  private router = inject(Router);

  constructor(protected readonly store: Store<IAuthState>) {
    this.isLoading$ = this.actionSubject.pipe(
      filter(({ type }) => type === authType.LOGIN_LOADING),
      map((action) => {
        const { isLoading } = action as { type: string; isLoading: boolean };
        return isLoading;
      })
    );
  }

  /**
   * INFO:
   * navigate - responsible to go to some page
   *
   * @param paths Array<string> paths to navigate
   */
  private navigate(paths: Array<string>) {
    setTimeout(() => this.router.navigate(paths), 300);
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
