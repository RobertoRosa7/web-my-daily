import { createAction } from '@ngrx/store';
import { profileType } from '../types/profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileHappenResponse } from '../interfaces/profile.happen.interface';

export const actionProfileHappensRequest = createAction(profileType.USER_PROFILE_HAPPENS);
export const actionProfileHappensSuccess = createAction(
  profileType.USER_PROFILE_HAPPEN_SUCESS,
  (payload: ProfileHappenResponse) => payload
);
export const actionProfileHappensError = createAction(
  profileType.USER_PROFILE_HAPPEN_ERROR,
  (payload: { error: HttpErrorResponse }) => payload
);
