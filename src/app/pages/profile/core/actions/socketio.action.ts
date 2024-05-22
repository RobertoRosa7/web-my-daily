import { createAction } from '@ngrx/store';
import { socketType } from '../types/socketio.type';
import { MsUserProfileResponse } from '../interfaces/profile.interface';

const userMetrics = socketType.USER_METRICS;
const callbackMetrics = (payload: MsUserProfileResponse) => payload;

export const actionSocketUserMetrics = createAction(userMetrics, callbackMetrics);
