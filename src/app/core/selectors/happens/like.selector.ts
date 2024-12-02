import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { HappenResponsePageable } from '../../interfaces/happens/profile.happen.interface';
import { HttpErrorResponse } from '@angular/common/http';

type SelectorHappens = MemoizedSelector<object, HappenResponsePageable>;
type SelectorHappenError = MemoizedSelector<object, HttpErrorResponse | null>;

const profileHappens: SelectorHappens = createFeatureSelector<HappenResponsePageable>('profileHappens');
// const timeline: SelectorHappens = createFeatureSelector<HappenResponsePageable>('timeline');

const callbackLIkeError = ({ error }: HappenResponsePageable) => (error instanceof HttpErrorResponse ? error : null);

export const selectHappenError: SelectorHappenError = createSelector(profileHappens, callbackLIkeError);
