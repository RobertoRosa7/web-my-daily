import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileResponse, ProfileSingleResponse } from '../interfaces/public-profile.interface';
import { ProfileRepository } from '../repositories/public-profile.repository';
import { JsonMapProperties } from '../../../../core/decorators/json.decorator';
import { PageableUser } from '../../../../interface/pageable.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicProfileService {
  constructor(private readonly profileRespository: ProfileRepository) {}

  /**
   * INFO:
   * getProfilePublic - Public any can access information from users
   * @returns Observable<ProfileHappenResponse>
   */
  public getProfilePublic(name: string | null): Observable<ProfileResponse> {
    return this.profileRespository.getProfilePublic(name).pipe(map((data) => this.singleTonOrPageable(name, data)));
  }

  /**
   * INFO:
   * singleTonOrPageable - responsible to serialize User or Pageable Use
   *
   * @param name string
   * @param response ProfileResponse
   * @returns
   */
  private singleTonOrPageable(name: string | null, response: ProfileResponse): ProfileResponse {
    return name
      ? JsonMapProperties.deserialize(ProfileSingleResponse, response)
      : { ...response, data: JsonMapProperties.deserialize(PageableUser, response.data) };
  }
}
