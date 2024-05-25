import { createAction } from '@ngrx/store';
import { userType } from '../types/user.type';
import { User } from '../interfaces/profile.interface';
import { ListeningFollowResponse } from '../../../../core/interfaces/follows/follow.interface';

const user = userType.USER;
const userFollowers = userType.FOLLOWERS;

const callbackUser = (payload: User) => payload;
const callbackFollowers = (payload: ListeningFollowResponse) => payload;

export const actionUser = createAction(user, callbackUser);
export const actionUserFollowers = createAction(userFollowers, callbackFollowers);
