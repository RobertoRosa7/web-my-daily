import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileListResponse } from '../../interfaces/public/public-profile.interface';
import { UniqueNameInterface } from '../../interfaces/auth/unique-name.interface';
import { UniqueNameRepository } from '../../repositories/auth/unique-name.repository';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';

@Injectable({
  providedIn: 'root',
})
export class UniqueNameService implements UniqueNameInterface {
  private readonly repository = inject(UniqueNameRepository);
  /**
   *
   * @param domainName string - name of domain from user
   * @returns ProfileListResponse
   */
  public isUniqueName(domainName: string): Observable<ProfileListResponse> {
    return this.repository.isUniqueName(domainName).pipe(
      // layer - serialize
      map((data) => JsonMapProperties.deserialize(ProfileListResponse, data))
    );
  }
}
