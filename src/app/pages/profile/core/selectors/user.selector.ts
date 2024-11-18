import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { HttpUserResponse, User } from '../interfaces/profile.interface';

const user: MemoizedSelector<object, HttpUserResponse> = createFeatureSelector<HttpUserResponse>('user');

const callbackId = ({ data }: HttpUserResponse): string | undefined => (data ? data.id : undefined);
const callbackUser = ({ data }: HttpUserResponse): User | undefined => (data ? data : undefined);
const callbackUserNickname = ({ data }: HttpUserResponse): string | undefined => (data ? data.name : undefined);
const callbackNicknameNok = ({ messageNok }: HttpUserResponse) => messageNok;
const callbackNicknameOk = ({ messageOk }: HttpUserResponse) => messageOk;
const callbackIsUpdatingUser = ({ isLoading }: HttpUserResponse) => isLoading;

export const selectorId = createSelector(user, callbackId);
export const selectorUser = createSelector(user, callbackUser);
export const selectName = createSelector(user, callbackUserNickname);
export const selectorChangeNicknameNok = createSelector(user, callbackNicknameNok);
export const selectorNicknameOk = createSelector(user, callbackNicknameOk);
export const selectorIsUpdatingUser = createSelector(user, callbackIsUpdatingUser);
