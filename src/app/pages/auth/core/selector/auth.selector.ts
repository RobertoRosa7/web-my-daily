import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IAuthState } from '../interface/auth.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

const error: MemoizedSelector<object, HttpResponseDefault<void>> = createFeatureSelector('auth');
const success: MemoizedSelector<object, HttpResponseDefault<IAuthState>> = createFeatureSelector<
  HttpResponseDefault<IAuthState>
>('auth');

export const selectorError: MemoizedSelector<object, HttpResponseDefault<void>> = createSelector(
  error,
  (states: HttpResponseDefault<void>) => states
);
export const selectorSuccess: MemoizedSelector<object, HttpResponseDefault<IAuthState>> = createSelector(
  success,
  (states: HttpResponseDefault<IAuthState>) => states
);
