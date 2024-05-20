import { createAction } from '@ngrx/store';
import { profileType } from '../types/public-profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../interfaces/public-profile.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';
import { FollowRequest } from '../../../../interface/follow.interface';

export const actionProfileRequest = createAction(profileType.USER_PROFILE);
export const actionProfileSuccess = createAction(
  profileType.USER_PROFILE_SUCESS,
  (payload: ProfileResponse) => payload
);

export const actionProfilePublicSuccess = createAction(
  profileType.USER_PROFILE_SUCESS,
  (payload: ProfileResponse | HttpResponseDefault<null>) => payload
);

export const actionProfilePublic = createAction(
  profileType.USER_PROFILE_PUBLIC,
  (payload: { name: string | null }) => payload
);

export const actionProfileError = createAction(
  profileType.USER_PROFILE_ERROR,
  (payload: { error: HttpErrorResponse }) => payload
);

export const actionUserFollow = createAction(profileType.USER_FOLLOW, (payload: FollowRequest) => payload);
export const actionUserFollowSuccess = createAction(
  profileType.USER_FOLLOW_SUCCESS,
  (payload: FollowRequest) => payload
);
