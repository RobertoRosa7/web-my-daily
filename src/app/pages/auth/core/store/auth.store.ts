import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../reducer/auth.reducer';
import { LocalStore } from '../../../../interface/store.interface';

export const AuthStore: ActionReducerMap<LocalStore> = {
  auth: authReducer,
};
