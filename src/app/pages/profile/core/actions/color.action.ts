import { createAction } from '@ngrx/store';
import { colorType } from '../../../../core/types/color.type';
import { colors } from '../../../../core/interfaces/colors.interface';

export const actionColor = createAction(colorType.BACKGROUND, (payload: colors) => payload);
