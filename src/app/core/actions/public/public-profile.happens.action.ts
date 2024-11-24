import { createAction } from '@ngrx/store';
import { profileType } from '../../types/public/public-profile.type';

const profileHappens = profileType.USER_PROFILE_HAPPENS;

export const publicHappenRequest = createAction(profileHappens);
