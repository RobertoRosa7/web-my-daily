import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileResponse, ProfileSingleResponse } from '../interfaces/profile.interface';
import { ProfileRepository } from '../repositories/profile.repository';
import { JsonMapProperties } from '../../../../core/decorators/jsons/json.decorator';
import { PageableUser } from '../../../../core/interfaces/pageables/pageable.interface';
import { FollowRequest } from '../../../../core/interfaces/follows/follow.interface';
import { HttpResponseDefault } from '../../../../core/interfaces/https/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly profileRespository: ProfileRepository = inject(ProfileRepository);

  /**
   * @see: https://cloudmark.github.io/Json-Mapping/
   */
  public getUseProfile(): Observable<ProfileSingleResponse> {
    return this.profileRespository
      .getUseProfile()
      .pipe(map((data) => JsonMapProperties.deserialize(ProfileSingleResponse, data)));
  }

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
   * Following - following user
   * @returns Observable<HttpResponseDefault<string>>
   */
  public following(follower: FollowRequest): Observable<HttpResponseDefault<string>> {
    return this.profileRespository.following(follower);
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
