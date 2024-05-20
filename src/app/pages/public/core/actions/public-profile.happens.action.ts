import { createAction } from '@ngrx/store';
import { profileType } from '../types/public-profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/public-profile.happen.interface';

const profileHappens = profileType.USER_PROFILE_HAPPENS;
const deleteRemote = profileType.USER_PROFILE_HAPPENS_DELETE_REMOTE;
const deleteLocal = profileType.USER_PROFILE_HAPPENS_DELETE_LOCAL;
const postLocal = profileType.USER_PROFILE_HAPPENS_POST_LOCAL;
const update = profileType.USER_PROFILE_HAPPENS_UPDATE;
const success = profileType.USER_PROFILE_HAPPEN_SUCESS;
const error = profileType.USER_PROFILE_HAPPEN_ERROR;

const callbackHappenPost = (payload: { index: number; data: ProfileHappen }) => payload;
const callbackHappenDelete = (payload: { index: number; data: ProfileHappen }) => payload;
const callbackHappenUpdate = (payload: ProfileHappen) => payload;
const callbackHappenSuccess = (payload: ProfileHappenResponse) => payload;
const callbackHappenError = (payload: { failed: HttpErrorResponse }) => payload;

export const actionProfileHappensRequest = createAction(profileHappens);

export const actionProfileHappenDeleteRemote = createAction(deleteRemote, callbackHappenUpdate);
export const actionProfileHappensPost = createAction(postLocal, callbackHappenPost);
export const actionProfileHappensDelete = createAction(deleteLocal, callbackHappenDelete);
export const actionProfileHappensUpdate = createAction(update, callbackHappenUpdate);
export const actionProfileHappensSuccess = createAction(success, callbackHappenSuccess);
export const actionProfileHappensError = createAction(error, callbackHappenError);
