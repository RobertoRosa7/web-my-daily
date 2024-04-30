import { environment } from '../../../../../environments/environment';

export enum Paths {
  signup = '/ms-users/auth',
  signin = '/ms-users/auth/login',
}

export class ConstantsRepository {
  private readonly host: string = environment.host;

  constructor() {}

  public get(key: Paths, host?: string): string {
    host = host ? host : this.host;
    const path = host + key;

    if (path === undefined) {
      throw new Error('Couldnt find ' + key + ' in paths');
    }

    return path;
  }
}
