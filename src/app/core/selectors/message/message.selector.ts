import { ShowMessage } from '@interfaces/message/message.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const state: MemoizedSelector<object, ShowMessage> = createFeatureSelector<ShowMessage>('message');

const cbShowMessage = (data: ShowMessage) => data;
export const selShowMessage: MemoizedSelector<object, ShowMessage> = createSelector(state, cbShowMessage);
