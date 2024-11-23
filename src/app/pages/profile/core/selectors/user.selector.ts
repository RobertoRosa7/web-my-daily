import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { HttpUserResponse } from '../interfaces/profile.interface';
import { Common } from '../../../../core/enums/bases/base.enum';

const user: MemoizedSelector<object, HttpUserResponse> = createFeatureSelector<HttpUserResponse>('user');

const callbackId = ({ data }: HttpUserResponse) => (data ? data.id : undefined);
const callbackUser = ({ data }: HttpUserResponse) => (data ? data : undefined);
const callbackNameId = ({ data }: HttpUserResponse) => (data ? data.nameId?.replace(Common.daily, '') : undefined);
const callbackUserNickname = ({ data }: HttpUserResponse) => (data ? data.name : undefined);
const callbackNicknameNok = ({ messageNok }: HttpUserResponse) => messageNok;
const callbackNicknameOk = ({ messageOk }: HttpUserResponse) => messageOk;
const callbackIsUpdatingUser = ({ isLoading }: HttpUserResponse) => isLoading;

export const selectorId = createSelector(user, callbackId);
export const selectorUser = createSelector(user, callbackUser);
export const selectorNameId = createSelector(user, callbackNameId);
export const selectName = createSelector(user, callbackUserNickname);
export const selectorChangeNicknameNok = createSelector(user, callbackNicknameNok);
export const selectorNicknameOk = createSelector(user, callbackNicknameOk);
export const selectorIsUpdatingUser = createSelector(user, callbackIsUpdatingUser);
