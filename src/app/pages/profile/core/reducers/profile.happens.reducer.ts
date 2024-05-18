import { createReducer, on } from '@ngrx/store';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/profile.happen.interface';
import {
  actionProfileHappensDelete,
  actionProfileHappensError,
  actionProfileHappensPost,
  actionProfileHappensSuccess,
} from '../actions/profile.happens.action';

import { actionCoreReset } from '../../../../core/actions/reset.action';
import { HttpErrorResponse } from '@angular/common/http';

type States = Partial<ProfileHappenResponse>;
type ProfileHappenIndex = { index: number; data: ProfileHappen };

const states: States = {};
const callbackResetStore = (_: States) => states;
const callbackSuccess = (_: States, payload: ProfileHappenResponse) => payload;
const callbackPost = (states: States, { index, data }: ProfileHappenIndex) => {
  const happens = [...(states.data || [])];
  const newNumbers = [...happens.slice(0, index), data, ...happens.slice(index)];
  return {
    ...states,
    data: newNumbers,
  };
};
const callbackDelete = (states: States, { index }: ProfileHappenIndex) => {
  const happens = [...(states.data || [])];
  happens.splice(index, 1);
  return {
    ...states,
    data: happens,
  };
};
const callbackError = (_: States, { failed }: { failed: HttpErrorResponse }) => ({
  ..._,
  message: failed.error,
  error: failed,
});

export const profileHappenReducer = createReducer(
  states,
  on(actionProfileHappensPost, callbackPost),
  on(actionProfileHappensSuccess, callbackSuccess),
  on(actionProfileHappensDelete, callbackDelete),
  on(actionCoreReset, callbackResetStore),
  on(actionProfileHappensError, callbackError)
);
