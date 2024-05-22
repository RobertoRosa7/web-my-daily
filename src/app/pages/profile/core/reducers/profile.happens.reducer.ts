import { createReducer, on } from '@ngrx/store';
import { ProfileHappen, HappenResponsePageable } from '../interfaces/profile.happen.interface';
import {
  happenDeleteLocal,
  happenDeleteRollback,
  happenError,
  happenPostLocal,
  happenPostRollback,
  happenPostSuccess,
  happenSuccess,
  happenUpdateLocal,
  happenUpdateRollback,
  happenUpdateSuccess,
} from '../actions/profile.happens.action';

import { actionCoreReset } from '../../../../core/actions/reset.action';
import { HttpErrorResponse } from '@angular/common/http';

type States = Partial<HappenResponsePageable>;
type ProfileHappenIndex = { index: number; data: ProfileHappen };

const states: States = {};
const getReferenceArray = (_: States) => [...(_.data || [])];
const updateDataStates = <T>(_: States, data: T) => ({ ..._, data });

const callbackResetStore = (_: States) => states;
const callbackSuccess = (_: States, payload: HappenResponsePageable) => payload;
const callbackDeleteRollback = (states: States, { index, data }: ProfileHappenIndex) => {
  const happens = getReferenceArray(states);
  const newNumbers = [...happens.slice(0, index), data, ...happens.slice(index)];
  return updateDataStates(states, newNumbers);
};

const callbackDelete = (states: States, { index }: ProfileHappenIndex) => {
  const happens = getReferenceArray(states);
  happens.splice(index, 1);
  return updateDataStates(states, happens);
};

const callbackError = (_: States, { failed }: { failed: HttpErrorResponse }) => ({
  ..._,
  message: failed.error,
  error: failed,
});

const callbackUpdate = (states: States, { index, data }: ProfileHappenIndex) => {
  const happens = getReferenceArray(states);
  happens[index] = data;
  return updateDataStates(states, happens);
};

const callbackPost = (states: States, { data }: ProfileHappenIndex) => {
  const happens = getReferenceArray(states);

  happens.unshift(data);
  return updateDataStates(states, happens);
};

export const profileHappenReducer = createReducer(
  states,
  on(happenDeleteLocal, callbackDelete),
  on(happenDeleteRollback, callbackDeleteRollback),

  on(happenUpdateLocal, callbackUpdate),
  on(happenUpdateRollback, callbackUpdate),
  on(happenUpdateSuccess, callbackUpdate),

  on(happenPostRollback, callbackDelete),
  on(happenPostLocal, callbackPost),
  on(happenPostSuccess, callbackUpdate),

  on(happenSuccess, callbackSuccess),
  on(happenError, callbackError),
  on(actionCoreReset, callbackResetStore)
);
