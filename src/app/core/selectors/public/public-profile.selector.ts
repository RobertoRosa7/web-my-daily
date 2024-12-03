import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileResponse, UserProfile } from '../../interfaces/public/public-profile.interface';
import { PageableUser } from '../../interfaces/pageables/pageable.interface';
import { HttpErrorResponse } from '@angular/common/http';

type Profile = MemoizedSelector<object, ProfileResponse>;
type SelectorProfile = MemoizedSelector<object, UserProfile | null>;
type SelectorMessage = MemoizedSelector<object, Pick<ProfileResponse, 'error' | 'message'>>;
type SelectorIsPublicProfile = MemoizedSelector<object, boolean>;
type SelectorProfileName = MemoizedSelector<object, Pick<UserProfile, 'name' | 'id'>>;
type SelectorPageablePublicProfile = MemoizedSelector<object, PageableUser | null>;
type SelectorUserPublicProfile = MemoizedSelector<object, UserProfile | null>;

// recovery state from store
const profile: Profile = createFeatureSelector<ProfileResponse>('public');

const cbProfile = ({ data }: ProfileResponse) => (data instanceof UserProfile ? data : null);
const cbMessage = ({ message, error }: ProfileResponse) => ({ error, message });
const cbIsPublic = ({ data }: ProfileResponse) => (data instanceof UserProfile ? !!data?.profilePublic : false);
const cbProfileName = ({ data }: ProfileResponse) => ({
  name: data instanceof UserProfile ? data?.name : '',
  id: data instanceof UserProfile ? data?.id : '',
});

const cbPageablePuProbile = ({ data }: ProfileResponse) => (data instanceof PageableUser ? data : null);
const cbPageableError = ({ error }: ProfileResponse) => error;
const cbUserPuProbile = ({ data }: ProfileResponse) => (data instanceof UserProfile ? data : null);

export const selProfile: SelectorProfile = createSelector(profile, cbProfile);
export const selMessage: SelectorMessage = createSelector(profile, cbMessage);
export const selIsProfilePublic: SelectorIsPublicProfile = createSelector(profile, cbIsPublic);
export const selProfileName: SelectorProfileName = createSelector(profile, cbProfileName);
export const selPageablePub: SelectorPageablePublicProfile = createSelector(profile, cbPageablePuProbile);
export const selPageableError = createSelector(profile, cbPageableError);

export const selUserPub: SelectorUserPublicProfile = createSelector(profile, cbUserPuProbile);
