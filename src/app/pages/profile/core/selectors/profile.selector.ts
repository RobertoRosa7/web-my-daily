import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserProfile, UserProfileResponse } from '../interfaces/profile.interface';

// recovery state from store
const profile: MemoizedSelector<object, UserProfileResponse> = createFeatureSelector<UserProfileResponse>('profile');

export const selectorProfile: MemoizedSelector<object, UserProfile | null> = createSelector(
  profile,
  ({ data }: UserProfileResponse) => data
);

export const selectorMessage: MemoizedSelector<object, Pick<UserProfileResponse, 'error' | 'message'>> = createSelector(
  profile,
  ({ message, error }: UserProfileResponse) => ({ error, message })
);

export const selectorProfilePublic: MemoizedSelector<object, boolean> = createSelector(
  profile,
  ({ data }: UserProfileResponse) => !!data?.profilePublic
);

export const selectorProfileName: MemoizedSelector<object, Pick<UserProfile, 'name' | 'id'>> = createSelector(
  profile,
  ({ data }: UserProfileResponse) => ({ name: data?.name, id: data?.id })
);
