import { createAction } from '@ngrx/store';
import { TimeLineTypes as homeTypes } from '../types/home.type';

const getTimeline = homeTypes.getTimeLineCards;

export const actionProfileRequest = createAction(getTimeline);
