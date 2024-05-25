import { createAction } from '@ngrx/store';
import { socketType } from '../types/public-socketio.type';
import { MsUserProfileResponse } from '../interfaces/public-profile.interface';

export const actionSocketUserMetrics = createAction(
  socketType.USER_METRICS,
  (payload: MsUserProfileResponse) => payload
);
