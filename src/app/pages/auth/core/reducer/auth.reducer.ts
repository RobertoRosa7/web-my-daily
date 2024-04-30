import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IAuthState } from '../interface/auth.interface';

const STATES: IAuthState = {
  auth: null,
};

export const authReducer = (state: IAuthState, action: Action): ActionReducer<IAuthState, Action> =>
  createReducer(STATES);
