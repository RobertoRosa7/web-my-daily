import { createAction } from '@ngrx/store';
import { likesTypes } from '../../types/happens/likes.type';
import {
  DisLikeRequest,
  LikeRequest,
  LikeResponse,
  LikeSocketio,
} from '../../interfaces/happens/profile.happen.interface';
import { HttpErrorResponse } from '@angular/common/http';

const dislikedLocal = likesTypes.disLikedPostLocal;
const dislikedRemote = likesTypes.disLikedPostRemote;

const likedLocal = likesTypes.likedPostLocal;
const likedRemote = likesTypes.likedPostRemote;

const socketio = likesTypes.likedSocketio;

const success = likesTypes.success;
const error = likesTypes.error;

const callbackDislikedRequest = (payload: {
  index: number;
  request: DisLikeRequest;
  userId?: string | null | undefined;
}) => payload;
const callbackLikedRequest = (payload: { index: number; request: LikeRequest; userId?: string | null | undefined }) =>
  payload;
const callbackLikesError = (payload: { failed: HttpErrorResponse }) => payload;
const callbackSocketio = (payload: LikeSocketio) => payload;
const callbackLikeResponse = (payload: LikeResponse) => payload;

export const actionLikeSuccess = createAction(success, callbackLikeResponse);

export const actionDislikedLocal = createAction(dislikedLocal, callbackDislikedRequest);
export const actionDislikedRemote = createAction(dislikedRemote, callbackDislikedRequest);

export const actionLikedLocal = createAction(likedLocal, callbackLikedRequest);
export const actionLikedRemote = createAction(likedRemote, callbackLikedRequest);
export const actionLikesError = createAction(error, callbackLikesError);
export const actionLikedSocketio = createAction(socketio, callbackSocketio);
