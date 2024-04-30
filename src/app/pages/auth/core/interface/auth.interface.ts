export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  checkTerms: boolean;
  nickname?: string;
  nameId: string;
}

export interface IAuthState {
  auth: IRegister | undefined | null;
}
