import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../interfaces/profile.interface';

type SelectorId = MemoizedSelector<object, string | undefined>;
type SelectorUser = MemoizedSelector<object, User | undefined>;

const user: MemoizedSelector<object, User> = createFeatureSelector<User>('user');

const callbackId = ({ id }: User) => id;
const callbackUser = (user: User): User | undefined => user;

export const selectorId: SelectorId = createSelector(user, callbackId);
export const selectorUser: SelectorUser = createSelector(user, callbackUser);