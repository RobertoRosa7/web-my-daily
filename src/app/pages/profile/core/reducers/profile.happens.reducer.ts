import { createReducer, on } from '@ngrx/store';
import { ProfileHappenResponse } from '../interfaces/profile.happen.interface';
import { actionProfileHappensSuccess } from '../actions/profile.happens.action';

const states: Partial<ProfileHappenResponse> = {};

export const profileHappenReducer = createReducer(
  states,
  on(actionProfileHappensSuccess, (_, { data, error, message }) => ({
    ..._,
    data,
    error,
    message,
  }))
);
