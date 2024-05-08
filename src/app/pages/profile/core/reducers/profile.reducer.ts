import { createReducer, on } from '@ngrx/store';
import { UserProfile, UserProfileResponse } from '../interfaces/profile.interface';
import { actionProfileSuccess } from '../actions/profile.action';
import { JsonMapProperties } from '../../../../core/decorators/json.decorator';

const states: Partial<UserProfileResponse> = {};

export const profileReducer = createReducer(
  states,
  on(actionProfileSuccess, (_, { data, message, error }) => {
    return {
      ..._,
      data: JsonMapProperties.deserialize(UserProfile, data),
      message,
      error,
    };
  })
);
