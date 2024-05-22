import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileHappen, HappenResponsePageable } from '../interfaces/profile.happen.interface';
import { HttpErrorResponse } from '@angular/common/http';

type SelectorHappens = MemoizedSelector<object, HappenResponsePageable>;
type SelectorProfileHappen = MemoizedSelector<object, Array<ProfileHappen> | undefined>;
type SelectorHappenError = MemoizedSelector<object, HttpErrorResponse | null>;

const profileHappens: SelectorHappens = createFeatureSelector<HappenResponsePageable>('profileHappens');

const callbackProfileHappen = ({ data }: HappenResponsePageable) => data;
const callbackHappenError = ({ error }: HappenResponsePageable) => (error instanceof HttpErrorResponse ? error : null);

export const selectHappenError: SelectorHappenError = createSelector(profileHappens, callbackHappenError);
export const selectorHappens: SelectorProfileHappen = createSelector(profileHappens, callbackProfileHappen);
