export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  checkTerms: boolean;
  nickname?: string;
  nameId: string;
}
