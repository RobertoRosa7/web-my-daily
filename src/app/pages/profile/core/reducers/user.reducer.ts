import { createReducer, on } from '@ngrx/store';
import { User } from '../interfaces/profile.interface';
import { actionUser } from '../actions/user.action';

type States = Partial<User>;

const states: States = {};

const callbackSetValues = (_: States, user: User) => user;

export const userReducer = createReducer(states, on(actionUser, callbackSetValues));
