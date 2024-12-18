import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileResponse, ProfileSingleResponse } from '../../interfaces/public/public-profile.interface';
import { ProfileRepository } from '../../repositories/public/public-profile.repository';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import { PageableUser } from '../../interfaces/pageables/pageable.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicProfileService {
  constructor(private readonly profileRespository: ProfileRepository) {}

  /**
   * getProfilePublic - Public any can access information from users
   * @returns Observable<ProfileHappenResponse>
   */
  public getProfilePublic(name: string | null): Observable<ProfileResponse> {
    return this.profileRespository.getProfilePublic(name).pipe(map((data) => this.singleTonOrPageable(name, data)));
  }

  /**
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
