import { ShowMessage } from '@interfaces/message/message.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const state: MemoizedSelector<object, ShowMessage> = createFeatureSelector<ShowMessage>('message');

const cbShowMessage = (data: ShowMessage) => data;
const cbIsShow = (data: ShowMessage) => data.show;

export const selShowMessage: MemoizedSelector<object, ShowMessage> = createSelector(state, cbShowMessage);
export const selIsShow: MemoizedSelector<object, boolean> = createSelector(state, cbIsShow);
