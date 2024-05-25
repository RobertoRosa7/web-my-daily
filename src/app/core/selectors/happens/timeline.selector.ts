import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProfileHappen, HappenResponsePageable } from '../../interfaces/happens/profile.happen.interface';

type SelectorHappens = MemoizedSelector<object, HappenResponsePageable>;
type SelectorProfileHappen = MemoizedSelector<object, Array<ProfileHappen> | undefined>;

const timeline: SelectorHappens = createFeatureSelector<HappenResponsePageable>('timeline');

const callbackTimeline = ({ data }: HappenResponsePageable) => data;

export const selctorTimeline: SelectorProfileHappen = createSelector(timeline, callbackTimeline);
