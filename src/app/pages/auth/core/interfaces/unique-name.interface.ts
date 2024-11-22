import { Observable } from 'rxjs';
import { ProfileListResponse } from '../../../public/core/interfaces/public-profile.interface';

export interface UniqueNameInterface {
  isUniqueName(domainName: string): Observable<ProfileListResponse>;
}
