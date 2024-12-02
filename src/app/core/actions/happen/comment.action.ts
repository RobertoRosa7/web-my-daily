import { createAction } from '@ngrx/store';
import { commentTypes } from '../../types/happens/comment.type';
import { CommentRequest, HappenCommentSingleTon } from '../../interfaces/happens/happen.comment.interface';
import { HttpErrorResponse } from '@angular/common/http';

const commentPostRemote = commentTypes.commentPostRemote;
const commentPostLocal = commentTypes.commentPostLocal;
const commentPutRemote = commentTypes.commentPutRemote;
const commentPutSuccess = commentTypes.commentPutSuccess;
const commentDeleteRemote = commentTypes.commentDeleteRemote;
const commentDeteteRemoteSuccess = commentTypes.commentDeleteRemoteSuccess;

const commentError = commentTypes.commentError;

const callbackPostLocal = (payload: HappenCommentSingleTon) => payload;
const callbackPutRemote = (payload: { commentId: string; request: CommentRequest }) => payload;
const callbackPostRemote = (payload: CommentRequest) => payload;
const callbackPostError = (payload: { failed: HttpErrorResponse }) => payload;
const callbackDeleteRemote = (payload: { commentId: string }) => payload;

export const happenCommentRemote = createAction(commentPostRemote, callbackPostRemote);
export const happenCommentPutRemote = createAction(commentPutRemote, callbackPutRemote);
export const happenCommentLocal = createAction(commentPostLocal, callbackPostLocal);
export const happenCommentPutSuccess = createAction(commentPutSuccess, callbackPostLocal);
export const happenCommentDeleteRemote = createAction(commentDeleteRemote, callbackDeleteRemote);
export const happenCommentDeleteRemoteSuccess = createAction(commentDeteteRemoteSuccess, callbackDeleteRemote);
export const actionCommentError = createAction(commentError, callbackPostError);
