import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../interfaces/auth.interface';
import { HttpResponseDefault } from '../../../../core/interfaces/https/http-response.interface';
import { actionClear, actionLoginError, actionLoginSuccess } from '../actions/auth.action';
import { HttpErrorResponse } from '@angular/common/http';

type States = Partial<HttpResponseDefault<IAuthState>>;
type Success = HttpResponseDefault<IAuthState>;
type Error = { fail: HttpErrorResponse };

const states: States = {};

const callbackSuccess = (_: States, { data, message, error }: Success) => ({ data, message, error });
const callbackError = (_: States, { fail }: Error) => ({ ..._, message: fail.error.message, error: fail.error.error });

export const authReducer = createReducer(
  states,
  on(actionLoginSuccess, callbackSuccess),
  on(actionLoginError, callbackError),
  on(actionClear, () => states)
);
