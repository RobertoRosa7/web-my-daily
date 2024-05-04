import { createAction } from '@ngrx/store';
import { colorType } from '../types/color.type';

export const actionColor = createAction(colorType.BACKGROUND, (payload: { background: string }) => payload);
