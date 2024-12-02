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

const cbSuccess = (payload: ProfileResponse) => payload;
const cbPublicSuccess = (payload: ProfileResponse | HttpResponseDefault<null>) => payload;
const cbError = (payload: { error: HttpErrorResponse }) => payload;
const cbFollowRequest = (payload: FollowRequest) => payload;
const cbFollowSuccess = (payload: FollowRequest) => payload;

export const acReqProfile = createAction(userProfile);
export const acSusProfile = createAction(userProfileSuccess, cbSuccess);
export const acPubSusProfile = createAction(userProfileSuccess, cbPublicSuccess);
export const acErrProfile = createAction(userProfileError, cbError);
export const acUseFollow = createAction(userFollow, cbFollowRequest);
export const acUseFollowSuccess = createAction(userFollowSuccess, cbFollowSuccess);
