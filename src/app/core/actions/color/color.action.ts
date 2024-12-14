import { createAction } from '@ngrx/store';
import { colorType } from '../../types/colors/color.type';
import { colors } from '../../interfaces/colors/colors.interface';

export const acColor = createAction(colorType.BACKGROUND, (payload: colors) => payload);
