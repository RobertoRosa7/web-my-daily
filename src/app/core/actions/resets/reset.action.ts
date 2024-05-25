import { createAction } from '@ngrx/store';
import { coreType } from '../../types/resets/reset.type';

export const actionCoreReset = createAction(coreType.RESET);
