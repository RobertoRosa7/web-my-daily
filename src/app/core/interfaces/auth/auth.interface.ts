import { HttpResponseDefault } from '../https/http-response.interface';
export type LoginResponse = HttpResponseDefault<IAuthState>;
export type LegisterResponse = HttpResponseDefault<IAuthState>;
export type ResetPassResponse = HttpResponseDefault<string>;

export interface ILogin {
  email: string;
  password: string;
}

export interface IResetPassRequest {
  email: string;
}

export interface IRegister extends ILogin {
  checkTerms: boolean;
  nickname?: string;
  nameId: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  profile_public: boolean;
  name_id: string;
  auth_id: string;
  photo_url?: string;
  cpf?: string;
  phone?: string;
  genre?: null;
}

export interface IAuthState {
  token: string | null;
  user: User | null;
}

export enum AuthVars {
  token = 'token',
  user = 'user',
}
