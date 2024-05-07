import { environment } from '../../../../../environments/environment';
import { Paths } from '../interfaces/auth.interface';

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
