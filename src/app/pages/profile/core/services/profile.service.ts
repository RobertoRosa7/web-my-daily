import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User, UserProfile, ProfileResponse } from '../interfaces/profile.interface';
import { ProfileRepository } from '../repositories/profile.repository';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/profile.happen.interface';
import { JsonMapProperties } from '../../../../core/decorators/json.decorator';
import { PageableGeneral } from '../../../../interface/pageable.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly profileRespository: ProfileRepository) {}

  /**
   * @see: https://cloudmark.github.io/Json-Mapping/
   */
  public getUseProfile(): Observable<ProfileResponse> {
    return this.profileRespository
      .getUseProfile()
      .pipe(map((response) => ({ ...response, data: JsonMapProperties.deserialize(UserProfile, response.data) })));
  }

  /**
   * INFO:
   * getHappens - layer 1
   * @returns Observable<ProfileHappenResponse>
   */
  public getHappens(): Observable<ProfileHappenResponse> {
    return this.profileRespository.getHappens().pipe(
      map((response) => ({
        ...response,
        data: response.data
          ? response.data.map((happens) => JsonMapProperties.deserialize(ProfileHappen, happens))
          : [],
      }))
    );
  }

  /**
   * INFO:
   * getProfilePublic - Public any can access information from users
   * @returns Observable<ProfileHappenResponse>
   */
  public getProfilePublic(name: string | null): Observable<ProfileResponse> {
    return this.profileRespository.getProfilePublic(name).pipe(
      map((response) => ({
        ...response,
        data: name
          ? JsonMapProperties.deserialize(UserProfile, response.data)
          : JsonMapProperties.deserialize(PageableGeneral<Array<User>>, response.data),
      })),
      tap(console.log)
    );
  }
}
