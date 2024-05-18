import { createAction } from '@ngrx/store';
import { coreType } from '../types/reset.type';

export const actionCoreReset = createAction(coreType.RESET);
