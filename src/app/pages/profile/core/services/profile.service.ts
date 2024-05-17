import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileResponse, ProfileSingleResponse } from '../interfaces/profile.interface';
import { ProfileRepository } from '../repositories/profile.repository';
import { ProfileHappen, ProfileHappenResponse } from '../interfaces/profile.happen.interface';
import { JsonMapProperties } from '../../../../core/decorators/json.decorator';
import { PageableUser } from '../../../../interface/pageable.interface';
import { FollowRequest } from '../../../../interface/follow.interface';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly profileRespository: ProfileRepository) {}

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
   * getHappens - layer 1
   * @returns Observable<ProfileHappenResponse>
   */
  public getHappens(): Observable<ProfileHappenResponse> {
    return this.profileRespository
      .getHappens()
      .pipe(map((data) => JsonMapProperties.deserialize(ProfileHappenResponse, data)));
  }

  /**
   * INFO:
   * deleteHappen - delete one happen
   * @returns Observable<HttpResponseDefault<void>>
   */
  public deleteHappen(happen: ProfileHappen): Observable<HttpResponseDefault<void>> {
    return this.profileRespository.deleteHappen(happen);
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
