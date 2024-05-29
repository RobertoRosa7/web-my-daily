import { HappenResponsePageable } from '../../interfaces/happens/profile.happen.interface';

import {
  HappenComment,
  HappenCommentHttpResponse,
  HappenCommentSingleTon,
} from '../../interfaces/happens/happen.comment.interface';
import { HttpErrorResponse } from '@angular/common/http';

type States = Partial<HappenResponsePageable>;
type CommentError = { failed: HttpErrorResponse };

const states: States = {};
const getReferenceArray = (_: States) => [...(_.comments || [])];
const updateDataStates = <T>(_: States, comments: T) => ({ ..._, comments });
const updateError = (_: States, { failed }: CommentError) => ({
  ..._,
  message: failed.error.message,
  error: true,
  comments: null,
});

export const callbackCommentSuccess = (states: States, { data }: HappenCommentHttpResponse) => {
  return updateDataStates(states, data);
};

export const callbackCommentError = (states: States, error: CommentError) => {
  return updateError(states, error);
};

export const callbackAddCommentLocal = (states: States, { data }: HappenCommentSingleTon) => {
  const comments = getReferenceArray(states);

  comments.unshift(data);
  return updateDataStates(states, comments);
};

export const callbackPutComment = (states: States, { data }: HappenCommentSingleTon) => {
  const comments = getReferenceArray(states);
  const index = comments.findIndex((comment) => comment.id === data.id);
  const comment = Object.assign(new HappenComment(), data);

  comments[index] = comment;
  return updateDataStates(states, comments);
};

export const callbackCommentDeleteRemoteSuccess = (states: States, { commentId }: { commentId: string }) => {
  const comments = getReferenceArray(states);
  const index = comments.findIndex((comment) => comment.id === commentId);
  comments.splice(index, 1);

  return updateDataStates(states, comments);
};
