import { createReducer, on } from '@ngrx/store';
import { HttpUserResponse, User } from '../../interfaces/profile/profile.interface';
import {
  acNameIdNok,
  acNameIdOk,
  acNicknameOk,
  acNicknameNok,
  acUser,
  acLoading,
} from '../../actions/user/user.action';
import { HttpErrorResponse } from '@angular/common/http';

type States = Partial<HttpUserResponse>;
type HttpResponseWithError = { failure: HttpErrorResponse };
type IsLoading = { isLoading: boolean };

const states: States = {};

const callbackSetValues = (_: States, data: User) => ({ ..._, data });
const callbackChangeNicknameOk = (_: States, { data }: HttpUserResponse) => ({
  ..._,
  data,
  messageOk: 'Alteração feita com sucesso!',
  messageNok: undefined,
  error: undefined,
  isLoading: false,
});
const callbackChangeNicknameNok = (_: States) => {
  return {
    ..._,
    messageOk: undefined,
    messageNok: 'Não foi possível efetuar operação. Por favor, verifique sua conexão com a internet e tente novamente.',
    isLoading: false,
  };
};

const cbLoading = (_: States, { isLoading }: IsLoading) => ({
  ..._,
  message: undefined,
  messageOk: undefined,
  messageNok: undefined,
  error: undefined,
  isLoading,
});

const cbNameIdNok = (_: States, { failure }: HttpResponseWithError) => ({
  ..._,
  data: failure.error.data,
  error: failure.error.error,
  messageNok: failure.error.message,
  messageOk: undefined,
  isLoading: false,
});
const cbNameIdOk = (_: States, resp: HttpUserResponse) => ({
  ..._,
  data: resp.data,
  error: resp.error,
  messageOk: resp.message,
  messageNok: undefined,
  isLoading: false,
});

export const userReducer = createReducer(
  states,
  on(acUser, callbackSetValues),
  on(acNicknameOk, callbackChangeNicknameOk),
  on(acNicknameNok, callbackChangeNicknameNok),

  on(acNameIdOk, cbNameIdOk),
  on(acNameIdNok, cbNameIdNok),
  on(acLoading, cbLoading)
);
