import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../interface/auth.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';
import { actionClear, actionLoginError, actionLoginSuccess } from '../action/auth.action';

const STATES: HttpResponseDefault<IAuthState> = {
  data: null,
  error: false,
  message: '',
};

export const authReducer = createReducer(
  STATES,
  on(actionLoginSuccess, (_, { data, message, error }) => ({ data, message, error })),

  on(actionLoginError, (_, { error }) => ({ ..._, message: error.message })),

  on(actionClear, () => STATES)
);
