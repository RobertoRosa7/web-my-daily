import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../../interfaces/auth/auth.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';
import { acClear, acLoginError, acLoginSuccess } from '../../actions/auth/auth.action';
import { HttpErrorResponse } from '@angular/common/http';

type States = Partial<HttpResponseDefault<IAuthState>>;
type Success = HttpResponseDefault<IAuthState>;
type Error = { fail: HttpErrorResponse };

const states: States = {};

const cbSuccess = (_: States, { data, message, error }: Success) => ({ data, message, error });
const cbError = (_: States, { fail }: Error) => ({ ..._, message: fail.error.message, error: fail.error.error });

export const authReducer = createReducer(
  states,
  on(acLoginSuccess, cbSuccess),
  on(acLoginError, cbError),
  on(acClear, () => states)
);
