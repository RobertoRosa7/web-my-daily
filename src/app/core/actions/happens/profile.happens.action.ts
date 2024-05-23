import { createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileHappen, HappenResponsePageable } from '../../interfaces/happens/profile.happen.interface';
import { happenTypes } from '../../types/happens/happen.type';

const voidTypes = happenTypes.happenVoid;
const happens = happenTypes.happens;
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

const success = happenTypes.happenSuccess;
const error = happenTypes.happenError;

const callbackHappen = (payload: { index: number; data: ProfileHappen }) => payload;
const callbackHappenSuccess = (payload: HappenResponsePageable) => payload;
const callbackHappenError = (payload: { failed: HttpErrorResponse }) => payload;

export const happenRequest = createAction(happens);
export const happenVoid = createAction(voidTypes);

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

export const happenSuccess = createAction(success, callbackHappenSuccess);
export const happenError = createAction(error, callbackHappenError);
