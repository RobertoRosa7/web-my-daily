import { Observable } from 'rxjs';
import { ProfileListResponse } from '../public/public-profile.interface';

export interface UniqueNameInterface {
  isUniqueName(domainName: string): Observable<ProfileListResponse>;
}
