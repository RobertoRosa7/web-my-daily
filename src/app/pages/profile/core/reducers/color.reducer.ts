import { createReducer, on } from '@ngrx/store';
import { actionColor } from '../actions/color.action';

type background = { background: string };

const states: background = {
  background: 'white',
};

export const colorReducer = createReducer(
  states,
  on(actionColor, (_, { background }) => ({ background }))
);
