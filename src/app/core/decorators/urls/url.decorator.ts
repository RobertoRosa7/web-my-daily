import { environment } from '../../../../environments/environment';
import { Paths } from '../../enums/bases/base.enum';

export const Url =
  (path: Paths, host: string = environment.host) =>
  (target: Record<string, any>, key: string): any =>
    Object.defineProperty(target, key, { value: host + path });
