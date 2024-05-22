import { createAction } from '@ngrx/store';
import { profileType } from '../types/profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileHappen, HappenResponsePageable } from '../interfaces/profile.happen.interface';

const voidTypes = profileType.happenVoid;
const happens = profileType.happens;
const deleteRemote = profileType.happenDeleteRemote;
const deleteLocal = profileType.happenDeleteLocal;
const deleteRollback = profileType.happenDeleteRollback;

const postLocal = profileType.happenPostLocal;
const postRollback = profileType.happenPostRollback;
const postRemote = profileType.happenPostRemote;
const postSuccess = profileType.happenPostSuccess;

const updateLocal = profileType.happenUpdateLocal;
const updateRemote = profileType.happenUpdateRemote;
const updateSuccess = profileType.happenUpdateSuccess;

const success = profileType.happenSuccess;
const error = profileType.happenError;

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
