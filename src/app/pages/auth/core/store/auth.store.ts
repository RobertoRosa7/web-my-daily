import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../reducer/auth.reducer';
import { LocalStore } from '../../../../interface/store.interface';
import { IAuthState } from '../interface/auth.interface';

export const AuthStore: ActionReducerMap<any> = {
  auth: authReducer,
};
