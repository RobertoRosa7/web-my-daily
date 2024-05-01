import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IAuthState } from '../interface/auth.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

const auth: MemoizedSelector<object, HttpResponseDefault<IAuthState>> = createFeatureSelector<
  HttpResponseDefault<IAuthState>
>('auth');

export const selectorMessage: MemoizedSelector<object, HttpResponseDefault<IAuthState>> = createSelector(
  auth,
  (states: HttpResponseDefault<IAuthState>) => states
);
