import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/profile.happen.interface';

const profileHappens: MemoizedSelector<object, ProfileHappenResponse> =
  createFeatureSelector<ProfileHappenResponse>('profileHappens');

export const selectorHappens: MemoizedSelector<object, Array<ProfileHappen> | null> = createSelector(
  profileHappens,
  ({ data }: ProfileHappenResponse) => data
);
