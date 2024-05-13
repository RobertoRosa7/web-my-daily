import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../interfaces/profile.interface';

const user: MemoizedSelector<object, User> = createFeatureSelector<User>('user');

export const selectorId: MemoizedSelector<object, string | undefined> = createSelector(user, ({ id }: User) => id);
