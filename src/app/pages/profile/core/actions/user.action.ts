import { createAction } from '@ngrx/store';
import { userType } from '../types/user.type';
import { User } from '../interfaces/profile.interface';

export const actionUser = createAction(userType.USER, (payload: User) => payload);
