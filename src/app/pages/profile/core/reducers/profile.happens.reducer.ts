import { createReducer, on } from '@ngrx/store';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/profile.happen.interface';
import { actionProfileHappensSuccess } from '../actions/profile.happens.action';
import { JsonMapProperties } from '../../../../core/decorators/json.decorator';

const states: Partial<ProfileHappenResponse> = {};

export const profileHappenReducer = createReducer(
  states,
  on(actionProfileHappensSuccess, (_, { data, error, message }) => ({
    ..._,
    data: data?.map((happens) => JsonMapProperties.deserialize(ProfileHappen, happens)),
    error,
    message,
  }))
);
