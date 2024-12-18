import { createReducer, on } from '@ngrx/store';
import { acColor } from '../../actions/color/color.action';
import { colors } from '../../interfaces/colors/colors.interface';

const states: colors = {
  background: 'linear-gradient(90deg, rgb(9, 0, 36) 0%, rgb(9, 9, 121) 100%, rgb(40, 70, 170) 130%)',
  theme: '',
};

export const colorReducer = createReducer(
  states,
  on(acColor, (state, { theme, background }) => ({ ...state, theme, background }))
);
