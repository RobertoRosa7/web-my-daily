import { acShowMessage } from '@actions/message/message.action';
import { ShowMessage } from '@interfaces/message/message.interface';
import { createReducer, on } from '@ngrx/store';

const states: Partial<ShowMessage> = {};

export const rdMessages = createReducer(
  states,
  on(acShowMessage, (state, { body }) => ({
    ...state,
    show: body.show,
    message: body.message,
    type: body.type,
  }))
);
