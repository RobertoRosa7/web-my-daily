import { createReducer, on } from '@ngrx/store';
import { HttpUserResponse, User } from '../interfaces/profile.interface';
import {
  actionChangeNickName,
  actionChangeNickNameOk,
  actionChangeNicknameNok,
  actionUser,
} from '../actions/user.action';

type States = Partial<HttpUserResponse>;

const states: States = {};

const callbackSetValues = (_: States, data: User) => ({ ..._, data });
const callbackChangeNicknameOk = (_: States, { data }: HttpUserResponse) => ({
  ..._,
  data,
  messageOk: 'Seu nickname foi atualizado com sucesso!',
  messageNok: undefined,
  error: undefined,
  isLoading: false,
});
const callbackChangeNicknameNok = (_: States) => {
  console.log('here');
  return {
    ..._,
    messageOk: undefined,
    messageNok:
      'Não foi possível atualizar seu nickname. Por favor, verifique sua conexão com a internet e tente novamente.',
    isLoading: false,
  };
};

const callbackChangeNickname = (_: States) => ({
  ..._,
  message: undefined,
  messageOk: undefined,
  messageNok: undefined,
  error: undefined,
  isLoading: true,
});

export const userReducer = createReducer(
  states,
  on(actionUser, callbackSetValues),
  on(actionChangeNickName, callbackChangeNickname),
  on(actionChangeNickNameOk, callbackChangeNicknameOk),
  on(actionChangeNicknameNok, callbackChangeNicknameNok)
);
