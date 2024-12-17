import { Component, PLATFORM_ID, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, delay, filter, from, map, mergeMap } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { IAuthState } from '@interfaces/auth/auth.interface';
import { HttpResponseDefault } from '@interfaces/https/http-response.interface';
import { acClear, acRegister, acLogin, acGoto, acLoading } from '@actions/auth/auth.action';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { acShowMessage } from '@actions/message/message.action';
import { AuthType } from '@acTypes/auth/auth.type';
import { AuthService } from '@services/auth/auth.services';
import { actionCoreReset } from '@actions/resets/reset.action';
import { FieldNameEnum, RoutePathsEnum } from '@enums/bases/base.enum';
import { InDestroyDirective } from '../../core/directives/destroy/destroy.directive';
import { acColor } from '@actions/color/color.action';
import * as selectAuth from '@selectors/auth/auth.selector';
import { selTheme } from '@selectors/colors/color.selector';

type Message = Observable<HttpResponseDefault<IAuthState>>;

@Component({
  selector: 'app-auth',
  template: `
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class AuthComponent extends InDestroyDirective {
  public form!: FormGroup;
  public readonly isLoading$!: Observable<boolean>;
  public readonly fieldNames = FieldNameEnum;
  public readonly routePaths = RoutePathsEnum;

  // responsible to listening actions to login success
  public readonly message$: Message = this.store
    // layer selector to filter
    .select(selectAuth.selectorMessage);

  public readonly theme$ = this.store.select(selTheme);

  // inject action subject dependency only super class?
  protected readonly acSubject = inject(ActionsSubject);
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  private readonly platform = inject(PLATFORM_ID);

  /**
   *
   * @param store Store<IAuthState>
   */
  constructor(protected readonly store: Store<IAuthState>) {
    super();
    // set theme login
    this.store.dispatch(acColor({ theme: 'login' }));

    // clear previous session
    if (isPlatformBrowser(this.platform)) {
      // clean localstorage
      this.authService.clearSession();
      // clean redux store
      this.store.dispatch(actionCoreReset());
    }

    // listening action loading happens
    this.isLoading$ = this.acSubject.pipe(
      // layer filer only action loading
      filter(({ type }) => type === AuthType.authLoadingType),
      // layer map catch payload action loading
      map((action) => {
        // abastract loading from action types
        const { isLoading } = action as { type: string; isLoading: boolean };

        // return loading
        return isLoading;
      })
    );

    // after login send to home
    this.acSubject
      .pipe(
        // layer filer only action login goto
        filter(({ type }) => type === AuthType.authGotoType),
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
    return acClear;
  }

  /**
   * loginAction = dispatch action to make login
   */
  public get loginAction() {
    return acLogin;
  }

  /**
   * registerActioln = dispath action to make register
   */
  public get registerActioln() {
    return acRegister;
  }

  /**
   * registerActioln = dispath action to make register
   */
  public get goToAction() {
    return acGoto;
  }

  /**
   * registerActioln = dispath action to make register
   */
  public get loading() {
    return acLoading;
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
