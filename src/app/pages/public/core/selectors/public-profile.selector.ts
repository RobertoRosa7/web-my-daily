import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileResponse, UserProfile } from '../interfaces/public-profile.interface';
import { PageableUser } from '../../../../interface/pageable.interface';

type Profile = MemoizedSelector<object, ProfileResponse>;
type SelectorProfile = MemoizedSelector<object, UserProfile | null>;
type SelectorMessage = MemoizedSelector<object, Pick<ProfileResponse, 'error' | 'message'>>;
type SelectorIsPublicProfile = MemoizedSelector<object, boolean>;
type SelectorProfileName = MemoizedSelector<object, Pick<UserProfile, 'name' | 'id'>>;
type SelectorPageablePublicProfile = MemoizedSelector<object, PageableUser | null>;
type SelectorUserPublicProfile = MemoizedSelector<object, UserProfile | null>;

// recovery state from store
const profile: Profile = createFeatureSelector<ProfileResponse>('public');

const callbackProfile = ({ data }: ProfileResponse) => (data instanceof UserProfile ? data : null);
const callbackMessage = ({ message, error }: ProfileResponse) => ({ error, message });
const callbackIsPublic = ({ data }: ProfileResponse) => (data instanceof UserProfile ? !!data?.profilePublic : false);
const callbackProfileName = ({ data }: ProfileResponse) => ({
  name: data instanceof UserProfile ? data?.name : '',
  id: data instanceof UserProfile ? data?.id : '',
});

const callbackPageablePuProbile = ({ data }: ProfileResponse) => (data instanceof PageableUser ? data : null);
const callbackUserPuProbile = ({ data }: ProfileResponse) => (data instanceof UserProfile ? data : null);

export const selectorProfile: SelectorProfile = createSelector(profile, callbackProfile);
export const selectorMessage: SelectorMessage = createSelector(profile, callbackMessage);
export const isSelectorProfilePublic: SelectorIsPublicProfile = createSelector(profile, callbackIsPublic);
export const selectorProfileName: SelectorProfileName = createSelector(profile, callbackProfileName);
export const selectorPageablePub: SelectorPageablePublicProfile = createSelector(profile, callbackPageablePuProbile);
export const selectorUserPub: SelectorUserPublicProfile = createSelector(profile, callbackUserPuProbile);
