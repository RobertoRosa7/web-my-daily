import { createAction } from '@ngrx/store';
import { authType } from '../type/auth.type';
import { IAuthState, ILogin, IRegister } from '../interface/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

export const actionLogin = createAction(authType.LOGIN, (payload: ILogin) => payload);
export const actionRegiser = createAction(authType.LOGIN_REGISTER, (payload: IRegister) => payload);
export const actionLoginError = createAction(authType.LOGIN_ERROR, (payload: { error: HttpErrorResponse }) => payload);
export const actionLoginSuccess = createAction(
  authType.LOGIN_SUCCESS,
  (payload: HttpResponseDefault<IAuthState>) => payload
);

export const actionClear = createAction(authType.CLEAR);
export const actionGoto = createAction(authType.LOGIN_GOTO, (payload: { paths: Array<string> }) => payload);
export const actionLoading = createAction(authType.LOGIN_LOADING, (payload: { isLoading: boolean }) => payload);
