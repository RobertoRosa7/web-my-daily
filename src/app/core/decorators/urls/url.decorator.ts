import { environment } from '../../../../environments/environment';
import { PathsEnum } from '../../enums/bases/base.enum';

export const Url =
  (path: PathsEnum, host: string = environment.host) =>
  (target: Record<string, any>, key: string): any =>
    Object.defineProperty(target, key, { value: host + path });
