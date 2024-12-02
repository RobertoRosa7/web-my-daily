import { MessageType } from '@acTypes/message/message.type';
import { ShowMessage } from '@interfaces/message/message.interface';
import { createAction } from '@ngrx/store';

export const acShowMessage = createAction(MessageType.mtShowMessage, (payload: { body: ShowMessage }) => payload);
