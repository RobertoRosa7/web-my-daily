import { createReducer, on } from '@ngrx/store';
import { User } from '../interfaces/profile.interface';
import { actionUser } from '../actions/user.action';
import { actionCoreReset } from '../../../../core/actions/reset.action';

type States = Partial<User>;

const states: Partial<User> = {};

const callbackSetValues = (_: States, user: User) => ({ ..._, ...user });
const callbackResetStore = (_: States) => states;

export const userReducer = createReducer(
  states,
  on(actionUser, callbackSetValues),
  on(actionCoreReset, callbackResetStore)
);
