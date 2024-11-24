import { createAction } from '@ngrx/store';
import { profileType } from '../../types/profile/profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../interfaces/profile/profile.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';
import { FollowRequest } from '../../interfaces/follows/follow.interface';

const userProfile = profileType.userProfile;
const userProfileSuccess = profileType.userProfileSuccess;
const userProfileError = profileType.userProfileError;
const userFollow = profileType.userFollow;
const userFollowSuccess = profileType.userFollowSuccess;

const callbackSuccess = (payload: ProfileResponse) => payload;
const callbackPublicSucces = (payload: ProfileResponse | HttpResponseDefault<null>) => payload;
const callbackError = (payload: { error: HttpErrorResponse }) => payload;
const callbackFollowRequest = (payload: FollowRequest) => payload;
const callbackFollowSuccess = (payload: FollowRequest) => payload;

export const actionProfileRequest = createAction(userProfile);
export const actionProfileSuccess = createAction(userProfileSuccess, callbackSuccess);
export const actionProfilePublicSuccess = createAction(userProfileSuccess, callbackPublicSucces);
export const actionProfileError = createAction(userProfileError, callbackError);
export const actionUserFollow = createAction(userFollow, callbackFollowRequest);
export const actionUserFollowSuccess = createAction(userFollowSuccess, callbackFollowSuccess);
