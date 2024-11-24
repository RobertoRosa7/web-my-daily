import { createAction } from '@ngrx/store';
import { authType } from '../../types/auth/auth.type';
import { IAuthState, ILogin, IRegister } from '../../interfaces/auth/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';

const login = authType.LOGIN;
const register = authType.LOGIN_REGISTER;
const error = authType.LOGIN_ERROR;
const success = authType.LOGIN_SUCCESS;
const clear = authType.CLEAR;
const goto = authType.LOGIN_GOTO;
const loading = authType.LOGIN_LOADING;

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
