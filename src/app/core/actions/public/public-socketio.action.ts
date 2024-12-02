import { createAction } from '@ngrx/store';
import { socketType } from '../../types/public/public-socketio.type';
import { MsUserProfileResponse } from '../../interfaces/public/public-profile.interface';

export const actionSocketUserMetrics = createAction(
  socketType.USER_METRICS,
  (payload: MsUserProfileResponse) => payload
);
