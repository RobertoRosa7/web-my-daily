import { createAction } from '@ngrx/store';
import { userType } from '../types/user.type';
import { User } from '../interfaces/profile.interface';
import { ListeningFollowResponse } from '../../../../interface/follow.interface';

export const actionUser = createAction(userType.USER, (payload: User) => payload);
export const actionUserFollowers = createAction(userType.FOLLOWERS, (payload: ListeningFollowResponse) => payload);
