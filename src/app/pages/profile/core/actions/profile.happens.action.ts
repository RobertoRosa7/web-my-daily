import { createAction } from '@ngrx/store';
import { profileType } from '../types/profile.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/profile.happen.interface';

export const actionProfileHappensRequest = createAction(profileType.USER_PROFILE_HAPPENS);
export const actionProfileHappensPost = createAction(
  profileType.USER_PROFILE_HAPPENS_POST,
  (payload: { index: number; data: ProfileHappen }) => payload
);
export const actionProfileHappensDelete = createAction(
  profileType.USER_PROFILE_HAPPENS_DELETE,
  (payload: { index: number; data: ProfileHappen }) => payload
);
export const actionProfileHappensUpdate = createAction(
  profileType.USER_PROFILE_HAPPENS_UPDATE,
  (payload: ProfileHappen) => payload
);
export const actionProfileHappensSuccess = createAction(
  profileType.USER_PROFILE_HAPPEN_SUCESS,
  (payload: ProfileHappenResponse) => payload
);
export const actionProfileHappensError = createAction(
  profileType.USER_PROFILE_HAPPEN_ERROR,
  (payload: { error: HttpErrorResponse }) => payload
);
