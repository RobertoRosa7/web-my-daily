import { Injectable } from '@angular/core';
import { BaseRepository } from './base.respository';
import { UniqueNameInterface } from '../../interfaces/auth/unique-name.interface';
import { Observable } from 'rxjs';
import { ProfileListResponse } from '../../interfaces/public/public-profile.interface';
import { Url } from '../../decorators/urls/url.decorator';
import { PathsEnum } from '../../enums/bases/base.enum';

@Injectable({ providedIn: 'root' })
export class UniqueNameRepository extends BaseRepository implements UniqueNameInterface {
  @Url(PathsEnum.pathGetSearch)
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
