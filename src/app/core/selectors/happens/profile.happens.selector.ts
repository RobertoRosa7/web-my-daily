import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { HappenResponsePageable } from '../../interfaces/happens/profile.happen.interface';
import { HttpErrorResponse } from '@angular/common/http';

type SelectorHappens = MemoizedSelector<object, HappenResponsePageable>;

const profileHappens: SelectorHappens = createFeatureSelector<HappenResponsePageable>('profileHappens');

const callbackHappenActive = ({ happenActive, index }: HappenResponsePageable) => ({ happenActive, index });
const callbackProfileHappen = ({ data }: HappenResponsePageable) => data;
const callbackHappenError = ({ error }: HappenResponsePageable) => (error instanceof HttpErrorResponse ? error : null);
const callbackComments = ({ comments, error, message }: HappenResponsePageable) => ({ comments, error, message });

export const selectHappenError = createSelector(profileHappens, callbackHappenError);
export const selectorHappens = createSelector(profileHappens, callbackProfileHappen);
export const selectHappenActive = createSelector(profileHappens, callbackHappenActive);
export const selectorComments = createSelector(profileHappens, callbackComments);
