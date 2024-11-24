import { createAction } from '@ngrx/store';
import { socketType } from '../../types/socket/socketio.type';
import { MsUserProfileResponse } from '../../interfaces/profile/profile.interface';

const userMetrics = socketType.USER_METRICS;
const callbackMetrics = (payload: MsUserProfileResponse) => payload;

export const actionSocketUserMetrics = createAction(userMetrics, callbackMetrics);
