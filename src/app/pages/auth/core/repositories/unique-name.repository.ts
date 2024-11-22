import { Injectable } from '@angular/core';
import { BaseRepository } from './base.respository';
import { UniqueNameInterface } from '../interfaces/unique-name.interface';
import { Observable } from 'rxjs';
import { ProfileListResponse } from '../../../public/core/interfaces/public-profile.interface';
import { Url } from '../../../../core/decorators/urls/url.decorator';
import { Paths } from '../../../../core/enums/bases/base.enum';

@Injectable({ providedIn: 'root' })
export class UniqueNameRepository extends BaseRepository implements UniqueNameInterface {
  @Url(Paths.pathGetSearch)
  private readonly pathGetSearch!: string;

  /**
   *
   * @param domainName string - name of domain from user
   * @returns Observable<ProfileListResponse>
   */
  public isUniqueName(domainName: string): Observable<ProfileListResponse> {
    return this.http.get<ProfileListResponse>(this.pathGetSearch.replace('{domainName}', domainName));
  }
}
