import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

// declare type to simply
type color = { background: string };

// recovery state from store
const state: MemoizedSelector<object, color> = createFeatureSelector<color>('colors');

// create selector
export const selectorColor: MemoizedSelector<object, string> = createSelector(
  state,
  ({ background }: color) => background
);
