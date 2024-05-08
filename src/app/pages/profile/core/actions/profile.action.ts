import { createAction } from '@ngrx/store';
import { profileType } from '../types/profile.type';
import { UserProfileResponse } from '../interfaces/profile.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const actionProfileRequest = createAction(profileType.USER_PROFILE);
export const actionProfileSuccess = createAction(
  profileType.USER_PROFILE_SUCESS,
  (payload: UserProfileResponse) => payload
);
export const actionProfileError = createAction(
  profileType.USER_PROFILE_ERROR,
  (payload: { error: HttpErrorResponse }) => payload
);
