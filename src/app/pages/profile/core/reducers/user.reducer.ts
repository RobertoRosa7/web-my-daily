import { createReducer, on } from '@ngrx/store';
import { User } from '../interfaces/profile.interface';
import { actionUser } from '../actions/user.action';

const states: Partial<User> = {};

export const userReducer = createReducer(
  states,
  on(actionUser, (_, user) => ({ ..._, ...user }))
);
