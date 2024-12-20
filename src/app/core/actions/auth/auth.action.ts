import { createAction } from '@ngrx/store';
import { AuthType } from '../../types/auth/auth.type';
import {
  CreatePassResponse,
  IAuthState,
  ILogin,
  IRegister,
  ResetPassResponse,
} from '../../interfaces/auth/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';

// Actions Types
const auLogin = AuthType.authLoginType;
const auRegister = AuthType.authRegiterType;
const auError = AuthType.authErrorType;
const auSuccess = AuthType.authSuccessType;
const auClear = AuthType.authClearType;
const autGoto = AuthType.authGotoType;
const auLoading = AuthType.authLoadingType;
const auSendEmail = AuthType.authSendEmailType;
const auSendEmailOk = AuthType.authSendEmailOkType;
const auCreatePass = AuthType.authCreatePassType;
const auCreatePassOk = AuthType.authCreatePassOkType;

// Callbacks
const cbLogin = (payload: ILogin) => payload;
const cbRegister = (payload: IRegister) => payload;
const cbError = (payload: { fail: HttpErrorResponse }) => payload;
const cbSuccess = (payload: HttpResponseDefault<IAuthState>) => payload;
const cbGoto = (payload: { paths: Array<string> }) => payload;
const cbLoading = (payload: { isLoading: boolean }) => payload;
const cbSendEmail = (payload: { email: string }) => payload;
const cbSendEmailOk = (payload: ResetPassResponse) => payload;
const cbCreatePass = (payload: { password: string; token: string }) => payload;
const cbCreatePassOk = (payload: CreatePassResponse) => payload;

// Actions
export const acClear = createAction(auClear);
export const acLogin = createAction(auLogin, cbLogin);
export const acRegister = createAction(auRegister, cbRegister);
export const acLoginError = createAction(auError, cbError);
export const acLoginSuccess = createAction(auSuccess, cbSuccess);
export const acGoto = createAction(autGoto, cbGoto);
export const acLoading = createAction(auLoading, cbLoading);
export const acSendEmail = createAction(auSendEmail, cbSendEmail);
export const acSendEmailOk = createAction(auSendEmailOk, cbSendEmailOk);
export const acCreatePass = createAction(auCreatePass, cbCreatePass);
export const acCreatePassOk = createAction(auCreatePassOk, cbCreatePassOk);
