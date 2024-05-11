import { createReducer, on } from '@ngrx/store';
import { actionProfileSuccess } from '../actions/profile.action';
import { ProfileResponse } from '../interfaces/profile.interface';

const states: Partial<ProfileResponse> = {};

export const profileReducer = createReducer(
  states,
  on(actionProfileSuccess, (_, { data, message, error }) => {
    return {
      ..._,
      data,
      message,
      error,
    };
  })
);
