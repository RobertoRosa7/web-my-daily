import { createAction } from '@ngrx/store';
import { AuthType } from '../../types/auth/auth.type';
import { IAuthState, ILogin, IRegister } from '../../interfaces/auth/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';

const login = AuthType.LOGIN;
const register = AuthType.LOGIN_REGISTER;
const error = AuthType.LOGIN_ERROR;
const success = AuthType.LOGIN_SUCCESS;
const clear = AuthType.CLEAR;
const goto = AuthType.LOGIN_GOTO;
const loading = AuthType.LOGIN_LOADING;

const callbackLogin = (payload: ILogin) => payload;
const callbackRegister = (payload: IRegister) => payload;
const callbackError = (payload: { fail: HttpErrorResponse }) => payload;
const callbackSuccess = (payload: HttpResponseDefault<IAuthState>) => payload;
const callbackGoto = (payload: { paths: Array<string> }) => payload;
const callbackLoading = (payload: { isLoading: boolean }) => payload;

export const actionClear = createAction(clear);

export const actionLogin = createAction(login, callbackLogin);
export const actionRegiser = createAction(register, callbackRegister);
export const actionLoginError = createAction(error, callbackError);
export const actionLoginSuccess = createAction(success, callbackSuccess);
export const actionGoto = createAction(goto, callbackGoto);
export const actionLoading = createAction(loading, callbackLoading);
