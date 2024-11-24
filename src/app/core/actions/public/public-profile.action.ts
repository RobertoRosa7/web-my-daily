import { createAction } from '@ngrx/store';
import { profileType } from '../../types/public/public-profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../interfaces/public/public-profile.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';
import { FollowRequest } from '../../interfaces/follows/follow.interface';

const profile = profileType.USER_PROFILE;
const success = profileType.USER_PROFILE_SUCESS;
const publicProfile = profileType.USER_PROFILE_PUBLIC;
const error = profileType.USER_PROFILE_ERROR;
const followSuccess = profileType.USER_FOLLOW_SUCCESS;
const follow = profileType.USER_FOLLOW;

const callbackSuccess = (payload: ProfileResponse) => payload;
const callbackProfile = (payload: ProfileResponse | HttpResponseDefault<null>) => payload;
const callbackProfilePublic = (payload: { name: string | null }) => payload;
const callbackError = (payload: { error: HttpErrorResponse }) => payload;
const callbackRequestFollow = (payload: FollowRequest) => payload;
const callbackFollowSuccess = (payload: FollowRequest) => payload;

export const actionProfileRequest = createAction(profile);
export const actionProfileSuccess = createAction(success, callbackSuccess);
export const actionProfilePublicSuccess = createAction(success, callbackProfile);

export const actionProfilePublic = createAction(publicProfile, callbackProfilePublic);
export const actionProfileError = createAction(error, callbackError);
export const actionUserFollow = createAction(follow, callbackRequestFollow);
export const actionUserFollowSuccess = createAction(followSuccess, callbackFollowSuccess);
