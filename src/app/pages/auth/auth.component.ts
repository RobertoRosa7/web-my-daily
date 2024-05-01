import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as selectAuth from './core/selector/auth.selector';
import { Observable, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAuthState } from './core/interface/auth.interface';
import { HttpResponseDefault } from '../../interface/http-response.interface';
import { actionClear, actionRegiser, actionLogin } from './core/action/auth.action';

@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>',
})
export class AuthComponent {
  public form!: FormGroup;
  public suffix = '@daily';
  public changeTexts = true;

  public loginResponse$: Observable<HttpResponseDefault<IAuthState>> = this.store
    .select(selectAuth.selectorSuccess)
    .pipe(filter(({ data }) => !!data));

  public error$: Observable<HttpResponseDefault<void>> = this.store
    .select(selectAuth.selectorError)
    .pipe(filter(({ data }) => !data));

  constructor(protected readonly store: Store<IAuthState>) {}

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
}
