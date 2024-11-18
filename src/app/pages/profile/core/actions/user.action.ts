import { createAction } from '@ngrx/store';
import { userType } from '../types/user.type';
import { HttpUserResponse, User } from '../interfaces/profile.interface';
import { ListeningFollowResponse } from '../../../../core/interfaces/follows/follow.interface';

const user = userType.user;
const userFollowers = userType.userFollowers;
const changeNickname = userType.userChangeNickName;
const changeNicknameOk = userType.userChangeNickNameOk;
const changeNicknameNok = userType.userChangeNickNameNok;

const callbackUser = (payload: User) => payload;
const callbackFollowers = (payload: ListeningFollowResponse) => payload;
const callbackChangeNicknameOk = (payload: HttpUserResponse) => payload;
const callbackChangeNicknameNok = (payload: HttpUserResponse) => payload;
const callbackNickname = (payload: { nickname: string }) => payload;

export const actionUser = createAction(user, callbackUser);
export const actionUserFollowers = createAction(userFollowers, callbackFollowers);
export const actionChangeNickName = createAction(changeNickname, callbackNickname);
export const actionChangeNickNameOk = createAction(changeNicknameOk, callbackChangeNicknameOk);
export const actionChangeNicknameNok = createAction(changeNicknameNok, callbackChangeNicknameNok);
