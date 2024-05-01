import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../reducer/auth.reducer';

export const AuthStore: ActionReducerMap<any> = {
  auth: authReducer,
};
