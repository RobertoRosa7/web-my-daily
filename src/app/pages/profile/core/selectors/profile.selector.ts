import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserProfile, UserProfileResponse } from '../interfaces/profile.interface';

// recovery state from store
const profile: MemoizedSelector<object, UserProfileResponse> = createFeatureSelector<UserProfileResponse>('profile');

// create selector
export const selectorProfile: MemoizedSelector<object, UserProfile | null> = createSelector(
  profile,
  ({ data }: UserProfileResponse) => data
);

// create selector
export const selectorMessage: MemoizedSelector<object, Pick<UserProfileResponse, 'error' | 'message'>> = createSelector(
  profile,
  ({ message, error }: UserProfileResponse) => ({ error, message })
);

// create selector
export const selectorProfilePublic: MemoizedSelector<object, boolean> = createSelector(
  profile,
  ({ data }: UserProfileResponse) => !!data?.profilePublic
);
