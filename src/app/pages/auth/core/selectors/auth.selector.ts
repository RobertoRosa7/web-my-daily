import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IAuthState } from '../interfaces/auth.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

// declare type to simply
type auth = HttpResponseDefault<IAuthState>;
type SelectorMessage = MemoizedSelector<object, auth>;

// recovery state from store
const state: MemoizedSelector<object, auth> = createFeatureSelector<auth>('auth');

const callbackMessage = (states: auth) => states;

// create selector
export const selectorMessage: SelectorMessage = createSelector(state, callbackMessage);
