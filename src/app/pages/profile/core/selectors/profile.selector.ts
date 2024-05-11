import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileResponse, ProfileSingletonOrPageable, UserProfile } from '../interfaces/profile.interface';

// recovery state from store
const profile: MemoizedSelector<object, ProfileResponse> = createFeatureSelector<ProfileResponse>('profile');

export const selectorProfile: MemoizedSelector<object, UserProfile | null> = createSelector(
  profile,
  ({ data }: ProfileResponse) => (data instanceof UserProfile ? data : null)
);

export const selectorMessage: MemoizedSelector<object, Pick<ProfileResponse, 'error' | 'message'>> = createSelector(
  profile,
  ({ message, error }: ProfileResponse) => ({ error, message })
);

export const isSelectorProfilePublic: MemoizedSelector<object, boolean> = createSelector(
  profile,
  ({ data }: ProfileResponse) => (data instanceof UserProfile ? !!data?.profilePublic : false)
);

export const selectorProfilePublic: MemoizedSelector<object, any | null> = createSelector(
  profile,
  ({ data }: ProfileResponse) => {
    if (!data) return null;

    return data instanceof UserProfile ? { pageable: null, data } : { pageable: data, data: null };
  }
);

export const selectorProfileName: MemoizedSelector<object, Pick<UserProfile, 'name' | 'id'>> = createSelector(
  profile,
  ({ data }: ProfileResponse) => ({
    name: data instanceof UserProfile ? data?.name : '',
    id: data instanceof UserProfile ? data?.id : '',
  })
);
