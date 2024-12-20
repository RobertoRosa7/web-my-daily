import { createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ProfileHappen,
  HappenResponsePageable,
  HappenRequest,
} from '../../interfaces/happens/profile.happen.interface';
import { happenTypes } from '../../types/happens/happen.type';
import { HappenCommentHttpResponse } from '../../interfaces/happens/happen.comment.interface';

const stoppingViewing = happenTypes.happenStoppingViewing;
const stoppingViewingOk = happenTypes.happenStoppingViewingSuccess;

const voidTypes = happenTypes.happenVoid;
const happens = happenTypes.happens;
const getTimeline = happenTypes.getTimeline;

const deleteRemote = happenTypes.happenDeleteRemote;
const deleteLocal = happenTypes.happenDeleteLocal;
const deleteRollback = happenTypes.happenDeleteRollback;

const postLocal = happenTypes.happenPostLocal;
const postRollback = happenTypes.happenPostRollback;
const postRemote = happenTypes.happenPostRemote;
const postSuccess = happenTypes.happenPostSuccess;

const updateLocal = happenTypes.happenUpdateLocal;
const updateRemote = happenTypes.happenUpdateRemote;
const updateSuccess = happenTypes.happenUpdateSuccess;

const findOne = happenTypes.happenFindOneLocal;
const comments = happenTypes.happenComments;
const commentsSuccess = happenTypes.happenCommentsSuccess;

const success = happenTypes.happenSuccess;
const error = happenTypes.happenError;

const callbackHappen = (payload: { index: number; data: ProfileHappen }) => payload;
const callbackHappenSuccess = (payload: HappenResponsePageable) => payload;
const callbackCommentSuccess = (payload: HappenCommentHttpResponse) => payload;
const callbackHappenError = (payload: { failed: HttpErrorResponse }) => payload;
const callbackHappenRequest = (payload: HappenRequest) => payload;

export const happenStoppingViewing = createAction(stoppingViewing, callbackHappenRequest);
export const happenStoppingViewingOk = createAction(stoppingViewingOk, callbackHappenRequest);

export const happenRequest = createAction(happens);
export const happenVoid = createAction(voidTypes);
export const happenTimeline = createAction(getTimeline);

export const happenPostLocal = createAction(postLocal, callbackHappen);
export const happenPostRollback = createAction(postRollback, callbackHappen);
export const happenPostRemote = createAction(postRemote, callbackHappen);
export const happenPostSuccess = createAction(postSuccess, callbackHappen);

export const happenDeleteRollback = createAction(deleteRollback, callbackHappen);
export const happenDeleteRemote = createAction(deleteRemote, callbackHappen);
export const happenDeleteLocal = createAction(deleteLocal, callbackHappen);

export const happenUpdateLocal = createAction(updateLocal, callbackHappen);
export const happenUpdateRollback = createAction(updateLocal, callbackHappen);
export const happenUpdateRemote = createAction(updateRemote, callbackHappen);
export const happenUpdateSuccess = createAction(updateSuccess, callbackHappen);
export const happenFindOneLocal = createAction(findOne, callbackHappen);
export const happenComments = createAction(comments, callbackHappen);

export const happenSuccess = createAction(success, callbackHappenSuccess);
export const happenError = createAction(error, callbackHappenError);

export const happenCommentError = createAction(error, callbackHappenError);
export const happenCommentSuccess = createAction(commentsSuccess, callbackCommentSuccess);
