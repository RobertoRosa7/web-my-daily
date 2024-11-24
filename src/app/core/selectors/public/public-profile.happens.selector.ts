import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileHappen, ProfileHappenResponse } from '../../interfaces/public/public-profile.happen.interface';
import { HttpErrorResponse } from '@angular/common/http';

type SelectorHappens = MemoizedSelector<object, ProfileHappenResponse>;
type SelectorProfileHappen = MemoizedSelector<object, Array<ProfileHappen> | undefined>;
type SelectorHappenError = MemoizedSelector<object, HttpErrorResponse | null>;

const profileHappens: SelectorHappens = createFeatureSelector<ProfileHappenResponse>('profileHappens');

const callbackProfileHappen = ({ data }: ProfileHappenResponse) => data;
const callbackHappenError = ({ error }: ProfileHappenResponse) => (error instanceof HttpErrorResponse ? error : null);

export const selectHappenError: SelectorHappenError = createSelector(profileHappens, callbackHappenError);
export const selectorHappens: SelectorProfileHappen = createSelector(profileHappens, callbackProfileHappen);
