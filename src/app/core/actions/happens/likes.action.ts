import { createAction } from '@ngrx/store';
import { likesTypes } from '../../types/happens/likes.type';
import { DisLikeRequest, LikeRequest } from '../../interfaces/happens/profile.happen.interface';
import { HttpErrorResponse } from '@angular/common/http';

const dislikedLocal = likesTypes.disLikedPostLocal;
const dislikedRemote = likesTypes.disLikedPostRemote;

const likedLocal = likesTypes.likedPostLocal;
const likedRemote = likesTypes.likedPostRemote;

const success = likesTypes.success;
const error = likesTypes.error;

const callbackDislikedRequest = (payload: { index: number; request: DisLikeRequest }) => payload;
const callbackLikedRequest = (payload: { index: number; request: LikeRequest }) => payload;
const callbackLikesError = (payload: { failed: HttpErrorResponse }) => payload;

export const likeSuccess = createAction(success);

export const actionDislikedLocal = createAction(dislikedLocal, callbackDislikedRequest);
export const actionDislikedRemote = createAction(dislikedRemote, callbackDislikedRequest);

export const actionLikedLocal = createAction(likedLocal, callbackLikedRequest);
export const actionLikedRemote = createAction(likedRemote, callbackLikedRequest);
export const actionLikesError = createAction(error, callbackLikesError);
