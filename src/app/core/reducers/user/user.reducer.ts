import { createReducer, on } from '@ngrx/store';
import { HttpUserResponse, User } from '../../interfaces/profile/profile.interface';
import {
  acNameIdNok,
  acNameIdOk,
  acNicknameOk,
  acNicknameNok,
  acUser,
  acResetState,
} from '../../actions/user/user.action';
import { HttpErrorResponse } from '@angular/common/http';

type States = Partial<HttpUserResponse>;
type HttpResponseWithError = { failure: HttpErrorResponse };

const states: States = {
  message: 'ajfdlasjflajdsf ljalsfja lj fsd lajfla jsdfl ajfdlasj dfljasld jlasjdflk ajsfdlas jfldajs lfdjalsdjfa',
};

const cbError = (_: States, { failure }: HttpResponseWithError) => ({
  ..._,
  error: failure.error.error,
  message: failure.error.message,
  typeError: 'error',
});

const cbSuccess = (_: States, resp: HttpUserResponse) => ({
  ..._,
  data: resp.data,
  error: resp.error,
  message: resp.message,
  typeError: 'success',
});

const cbResetStates = (_: States) => ({
  ..._,
  error: false,
  message: undefined,
  typeError: undefined,
});

const cbSetValues = (_: States, data: User) => ({ ..._, data });
const cbNicknameOk = (_: States, resp: HttpUserResponse) => cbSuccess(_, resp);
const cbNicknameNok = (_: States, error: HttpResponseWithError) => cbError(_, error);
const cbNameIdNok = (_: States, error: HttpResponseWithError) => cbError(_, error);
const cbNameIdOk = (_: States, resp: HttpUserResponse) => cbSuccess(_, resp);

export const userReducer = createReducer(
  states,
  on(acUser, cbSetValues),
  on(acNicknameOk, cbNicknameOk),
  on(acNicknameNok, cbNicknameNok),

  on(acNameIdOk, cbNameIdOk),
  on(acNameIdNok, cbNameIdNok),
  on(acResetState, cbResetStates)
);
