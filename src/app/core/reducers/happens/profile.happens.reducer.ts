import { createReducer, on } from '@ngrx/store';
import {
  ProfileHappen,
  HappenResponsePageable,
  HappenRequest,
} from '../../interfaces/happens/profile.happen.interface';
import {
  happenCommentError,
  happenCommentSuccess,
  happenDeleteLocal,
  happenDeleteRollback,
  happenError,
  happenFindOneLocal,
  happenPostLocal,
  happenPostRollback,
  happenPostSuccess,
  happenStoppingViewingOk,
  happenSuccess,
  happenUpdateLocal,
  happenUpdateRollback,
  happenUpdateSuccess,
} from '../../actions/happen/profile.happens.action';

import { HttpErrorResponse } from '@angular/common/http';
import {
  actionDislikedLocal,
  actionLikedLocal,
  actionLikedSocketio,
  actionLikeSuccess,
} from '../../actions/happen/likes.action';
import {
  callbackDislikedLocal,
  callbackLikeSuccess,
  callbackLikedLocal,
  callbackUpdateLikeSocketio,
} from './like.reducer';
import {
  callbackAddCommentLocal,
  callbackCommentDeleteRemoteSuccess,
  callbackCommentError,
  callbackCommentSuccess,
  callbackPutComment,
} from './comment.reducer';
import {
  happenCommentDeleteRemoteSuccess,
  happenCommentLocal,
  happenCommentPutSuccess,
} from '../../actions/happen/comment.action';

type States = Partial<HappenResponsePageable>;
type ProfileHappenIndex = { index: number; data: ProfileHappen };

const states: States = {};
const getReferenceArray = (_: States) => [...(_.data || [])];
const updateDataStates = <T>(_: States, data: T) => ({ ..._, data });

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

const callbackFindOne = (states: States, { data, index }: ProfileHappenIndex) => {
  return {
    ...states,
    happenActive: data,
    index,
  };
};

const callbackStoppingViewing = (states: States, { happenId }: HappenRequest) => {
  const happens = getReferenceArray(states);
  const index = happens.findIndex((happen) => happen.id === happenId);
  happens.splice(index, 1);
  return updateDataStates(states, happens);
};

export const happenReducer = createReducer(
  states,
  on(happenDeleteLocal, callbackDelete),
  on(happenDeleteRollback, callbackDeleteRollback),

  on(happenUpdateLocal, callbackUpdate),
  on(happenUpdateRollback, callbackUpdate),
  on(happenUpdateSuccess, callbackUpdate),

  on(happenPostRollback, callbackDelete),
  on(happenPostLocal, callbackPost),
  on(happenPostSuccess, callbackUpdate),
  on(happenFindOneLocal, callbackFindOne),

  on(happenCommentError, callbackCommentError),
  on(happenCommentSuccess, callbackCommentSuccess),
  on(happenCommentLocal, callbackAddCommentLocal),
  on(happenCommentPutSuccess, callbackPutComment),
  on(happenCommentDeleteRemoteSuccess, callbackCommentDeleteRemoteSuccess),

  on(happenStoppingViewingOk, callbackStoppingViewing),

  on(actionDislikedLocal, callbackDislikedLocal),
  on(actionLikedLocal, callbackLikedLocal),
  on(actionLikeSuccess, callbackLikeSuccess),

  on(actionLikedSocketio, callbackUpdateLikeSocketio),
  on(happenSuccess, callbackSuccess),
  on(happenError, callbackError)
);
