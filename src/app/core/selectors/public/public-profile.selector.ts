import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileResponse, UserProfile } from '../../interfaces/public/public-profile.interface';
import { PageableUser } from '../../interfaces/pageables/pageable.interface';

type Profile = MemoizedSelector<object, ProfileResponse>;
type SelProfile = MemoizedSelector<object, UserProfile | null>;
type SelMessage = MemoizedSelector<object, Pick<ProfileResponse, 'error' | 'message'>>;
type SelIsPublicProfile = MemoizedSelector<object, boolean>;
type SelProfileName = MemoizedSelector<object, Pick<UserProfile, 'name' | 'id'>>;
type SelPageablePublicProfile = MemoizedSelector<object, PageableUser>;
type SelUserPubProfile = MemoizedSelector<object, UserProfile | null>;

// recovery state from store
const profile: Profile = createFeatureSelector<ProfileResponse>('public');

const cbProfile = ({ data }: ProfileResponse) => (data instanceof UserProfile ? data : null);
const cbMessage = ({ message, error }: ProfileResponse) => ({ error, message });
const cbIsPublic = ({ data }: ProfileResponse) => (data instanceof UserProfile ? !!data?.profilePublic : false);
const cbProfileName = ({ data }: ProfileResponse) => ({
  name: data instanceof UserProfile ? data?.name : '',
  id: data instanceof UserProfile ? data?.id : '',
});

const cbPageablePuProbile = ({ data }: ProfileResponse) => (data instanceof PageableUser ? data : new PageableUser());
const cbPageableError = ({ error }: ProfileResponse) => error;
const cbUserPuProbile = ({ data }: ProfileResponse) => (data instanceof UserProfile ? data : null);

export const selProfile: SelProfile = createSelector(profile, cbProfile);
export const selMessage: SelMessage = createSelector(profile, cbMessage);
export const selIsProfilePublic: SelIsPublicProfile = createSelector(profile, cbIsPublic);
export const selProfileName: SelProfileName = createSelector(profile, cbProfileName);
export const selPageablePub: SelPageablePublicProfile = createSelector(profile, cbPageablePuProbile);
export const selPageableError = createSelector(profile, cbPageableError);

export const selUserPub: SelUserPubProfile = createSelector(profile, cbUserPuProbile);
