import { Component, PLATFORM_ID, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as selectAuth from '../../core/selectors/auth/auth.selector';
import { Observable, delay, filter, from, map, mergeMap } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { IAuthState } from '../../core/interfaces/auth/auth.interface';
import { HttpResponseDefault } from '../../core/interfaces/https/http-response.interface';
import {
  actionClear,
  actionRegiser,
  actionLogin,
  actionGoto,
  actionLoading,
} from '../../core/actions/auth/auth.action';
import { AuthType } from '../../core/types/auth/auth.type';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.services';
import { isPlatformBrowser } from '@angular/common';
import { actionCoreReset } from '../../core/actions/resets/reset.action';
import { actionColor } from '../../core/actions/color/color.action';
import { FieldNameEnum } from '../../core/enums/bases/base.enum';
import { InDestroyDirective } from '../../core/directives/destroy/destroy.directive';
import { acShowMessage } from '@actions/message/message.action';

@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>',
})
export class AuthComponent extends InDestroyDirective {
  public form!: FormGroup;
  public readonly isLoading$!: Observable<boolean>;
  public readonly fieldNames = FieldNameEnum;

  // responsible to listening actions to login success
  public readonly message$: Observable<HttpResponseDefault<IAuthState>> = this.store
    // layer selector to filter
    .select(selectAuth.selectorMessage);

  // inject action subject dependency only super class?
  private readonly actionSubject = inject(ActionsSubject);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly platform = inject(PLATFORM_ID);

  constructor(protected readonly store: Store<IAuthState>) {
    super();
    // set theme login
    this.store.dispatch(actionColor({ theme: 'login' }));

    // clear previous session
    if (isPlatformBrowser(this.platform)) {
      // clean localstorage
      this.authService.clearSession();
      // clean redux store
      this.store.dispatch(actionCoreReset());
    }

    // listening action loading happens
    this.isLoading$ = this.actionSubject.pipe(
      // layer filer only action loading
      filter(({ type }) => type === AuthType.LOGIN_LOADING),
      // layer map catch payload action loading
      map((action) => {
        // abastract loading from action types
        const { isLoading } = action as { type: string; isLoading: boolean };

        // return loading
        return isLoading;
      })
    );

    // after login send to home
    this.actionSubject
      .pipe(
        // layer filer only action login goto
        filter(({ type }) => type === AuthType.LOGIN_GOTO),
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
        mergeMap(this.navigate.bind(this)),
        // layer - ondestroy free memory
        this.takeUntilDestroy()
      )
      .subscribe();
  }

  public onFireEvent(field: string, form: FormControl) {
    this.form.addControl(field, form);
  }

  /**
   * getEmail = get name field from form
   */
  public get getEmail() {
    return this.form.get(FieldNameEnum.email)?.value;
  }

  /**
   * getPassword = get name field from form
   */
  public get getPassword() {
    return this.form.get(FieldNameEnum.password)?.value;
  }

  /**
   * getNickName = get name field from form
   */
  public get getNickName() {
    return this.form.get(FieldNameEnum.nickname)?.value;
  }

  /**
   * getNameId = get name field from form
   */
  public get getNameId() {
    return this.form.get(FieldNameEnum.nameId)?.value;
  }

  /**
   * getCheckTerms = get name field from form
   */
  public get getCheckTerms() {
    return this.form.get(FieldNameEnum.checkTerms)?.value;
  }

  /**
   * clearAction = reset message on display
   */
  public get clearAction() {
    return actionClear;
  }

  /**
   * loginAction = dispatch action to make login
   */
  public get loginAction() {
    return actionLogin;
  }

  /**
   * registerActioln = dispath action to make register
   */
  public get registerActioln() {
    return actionRegiser;
  }

  /**
   * registerActioln = dispath action to make register
   */
  public get goToAction() {
    return actionGoto;
  }

  /**
   * registerActioln = dispath action to make register
   */
  public get loading() {
    return actionLoading;
  }

  /**
   * navigate - responsible to go to some page
   *
   * @param paths Array<string> paths to navigate
   */
  private navigate(paths: Array<string>): Observable<boolean> {
    // clear fields message on display
    this.store.dispatch(this.clearAction());

    // clear message
    this.store.dispatch(
      acShowMessage({
        body: {
          type: '',
          show: false,
          message: '',
        },
      })
    );

    // navigate
    return from(this.router.navigate(paths));
  }
}
