import { createAction } from '@ngrx/store';
import { socketType } from '../types/socketio.type';
import { MsUserProfileResponse } from '../interfaces/profile.interface';

export const actionSocketUserMetrics = createAction(socketType.USER_METRICS, (payload: MsUserProfileResponse) => payload);
