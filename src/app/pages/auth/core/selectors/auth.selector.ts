import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IAuthState } from '../interfaces/auth.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

// declare type to simply
type auth = HttpResponseDefault<IAuthState>;

// recovery state from store
const state: MemoizedSelector<object, auth> = createFeatureSelector<auth>('auth');

// create selector
export const selectorMessage: MemoizedSelector<object, auth> = createSelector(state, (states: auth) => states);
