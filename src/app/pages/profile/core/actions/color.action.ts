import { createAction } from '@ngrx/store';
import { colorType } from '../../../../core/types/colors/color.type';
import { colors } from '../../../../core/interfaces/colors/colors.interface';

export const actionColor = createAction(colorType.BACKGROUND, (payload: colors) => payload);
