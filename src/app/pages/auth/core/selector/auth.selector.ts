import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IAuthState, IRegister } from '../interface/auth.interface';

const auth: MemoizedSelector<object, IAuthState> = createFeatureSelector<IAuthState>('auth');

export const selectError: MemoizedSelector<object, IRegister | undefined | null> = createSelector(
  auth,
  (states: IAuthState): IRegister | undefined | null => states.auth
);
