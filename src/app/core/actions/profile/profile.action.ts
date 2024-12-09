import { createAction } from '@ngrx/store';
import { profileType } from '../../types/profile/profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../interfaces/profile/profile.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';
import { FollowRequest } from '../../interfaces/follows/follow.interface';

const usProType = profileType.userProfile;
const usProSuccessType = profileType.userProfileSuccess;
const usProErrorType = profileType.userProfileError;
const useFollowType = profileType.userFollow;
const usFollowSucessType = profileType.userFollowSuccess;
const usResetType = profileType.userReset;

const cbSuccess = (payload: ProfileResponse) => payload;
const cbPublicSuccess = (payload: ProfileResponse | HttpResponseDefault<null>) => payload;
const cbError = (payload: { error: HttpErrorResponse }) => payload;
const cbFollowRequest = (payload: FollowRequest) => payload;
const cbFollowSuccess = (payload: FollowRequest) => payload;

export const acReqProfile = createAction(usProType);
export const acReset = createAction(usResetType);
export const acSusProfile = createAction(usProSuccessType, cbSuccess);
export const acPubSusProfile = createAction(usProSuccessType, cbPublicSuccess);
export const acErrProfile = createAction(usProErrorType, cbError);
export const acUseFollow = createAction(useFollowType, cbFollowRequest);
export const acUseFollowSuccess = createAction(usFollowSucessType, cbFollowSuccess);
