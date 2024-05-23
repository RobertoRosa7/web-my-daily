import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { colors } from '../../interfaces/colors/colors.interface';

// recovery state from store
const state: MemoizedSelector<object, colors> = createFeatureSelector<colors>('colors');

// create selector
export const selectorBg: MemoizedSelector<object, string> = createSelector(
  state,
  ({ background }: colors) => background || ''
);
export const selectorTheme: MemoizedSelector<object, string> = createSelector(
  state,
  ({ theme }: colors) => theme || ''
);
