import { createAction } from '@ngrx/store';
import { userType } from '../../types/user/user.type';
import { HttpUserResponse, User } from '../../interfaces/profile/profile.interface';
import { ListeningFollowResponse } from '../../interfaces/follows/follow.interface';
import { HttpErrorResponse } from '@angular/common/http';

// action type
const user = userType.user;
const userFollowers = userType.userFollowers;

const usResetState = userType.usReset;

const chNickname = userType.chNickname;
const chNicknameOk = userType.chNicknameOk;
const chNicknameNok = userType.chNicknameNok;

const chNameId = userType.chNameId;
const chNameOk = userType.chNameIdOk;
const chNameNok = userType.chNameIdNok;

// callback function
const cbUser = (payload: User) => payload;
const cbUsFollwers = (payload: ListeningFollowResponse) => payload;

const cbNickname = (payload: { nickname: string }) => payload;
const cbNicknameOk = (payload: HttpUserResponse) => payload;
const cbNicknameNok = (payload: { failure: HttpErrorResponse }) => payload;

const cbNameId = (payload: { nameId: string }) => payload;
const cbNameIdOk = (payload: HttpUserResponse) => payload;
const cbNameIdNok = (payload: { failure: HttpErrorResponse }) => payload;

// export action create
export const acUser = createAction(user, cbUser);
export const acUsFollowers = createAction(userFollowers, cbUsFollwers);

export const acNickname = createAction(chNickname, cbNickname);
export const acNicknameOk = createAction(chNicknameOk, cbNicknameOk);
export const acNicknameNok = createAction(chNicknameNok, cbNicknameNok);

export const acNameId = createAction(chNameId, cbNameId);
export const acNameIdOk = createAction(chNameOk, cbNameIdOk);
export const acNameIdNok = createAction(chNameNok, cbNameIdNok);

export const acResetState = createAction(usResetState);
