import { createReducer, on } from '@ngrx/store';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/profile.happen.interface';
import {
  actionProfileHappensDelete,
  actionProfileHappensPost,
  actionProfileHappensSuccess,
} from '../actions/profile.happens.action';

type States = Partial<ProfileHappenResponse>;

const states: States = {};
const callbackSuccess = (_: States, payload: ProfileHappenResponse) => payload;
const callbackPost = (states: States, { index, data }: { index: number; data: ProfileHappen }) => {
  const happens = [...(states.data || [])];
  const newNumbers = [...happens.slice(0, index), data, ...happens.slice(index)];
  return {
    ...states,
    data: newNumbers,
  };
};
const callbackDelete = (states: States, { index }: { index: number; data: ProfileHappen }) => {
  const happens = [...(states.data || [])];
  happens.splice(index, 1);

  return {
    ...states,
    data: happens,
  };
};

export const profileHappenReducer = createReducer(
  states,
  on(actionProfileHappensPost, callbackPost),
  on(actionProfileHappensSuccess, callbackSuccess),
  on(actionProfileHappensDelete, callbackDelete)
);
