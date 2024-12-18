import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { HttpUserResponse } from '../../interfaces/profile/profile.interface';
import { CommonEnum } from '../../enums/bases/base.enum';

const user: MemoizedSelector<object, HttpUserResponse> = createFeatureSelector<HttpUserResponse>('user');

const cbGetId = ({ data }: HttpUserResponse) => (data ? data.id : undefined);
const cbGetUser = ({ data }: HttpUserResponse) => (data ? data : undefined);
const cbGetNameId = ({ data }: HttpUserResponse) => (data ? data.nameId?.replace(CommonEnum.daily, '') : undefined);
const cbGetNickname = ({ data }: HttpUserResponse) => (data ? data.name : undefined);
const cbMessage = ({ message, typeError }: HttpUserResponse) => ({ message, typeError });

export const selGetId = createSelector(user, cbGetId);
export const selGetUser = createSelector(user, cbGetUser);
export const selGetNameId = createSelector(user, cbGetNameId);
export const selGetNickname = createSelector(user, cbGetNickname);
export const selMessage = createSelector(user, cbMessage);
