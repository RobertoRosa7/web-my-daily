import { createAction } from '@ngrx/store';
import { colorType } from '../types/color.type';
import { colors } from '../interfaces/colors.interface';

export const actionColor = createAction(colorType.BACKGROUND, (payload: colors) => payload);
