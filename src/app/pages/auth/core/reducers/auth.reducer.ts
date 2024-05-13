import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../interfaces/auth.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';
import { actionClear, actionLoginError, actionLoginSuccess } from '../actions/auth.action';

const STATES: HttpResponseDefault<IAuthState> = {
  data: undefined,
  error: false,
  message: '',
};

export const authReducer = createReducer(
  STATES,

  // case success
  on(actionLoginSuccess, (_, { data, message, error }) => ({ data, message, error })),

  // case error
  on(actionLoginError, (_, { fail }) => ({ ..._, message: fail.error.message, error: fail.error.error })),

  // clear states - reset all values
  on(actionClear, () => STATES)
);
