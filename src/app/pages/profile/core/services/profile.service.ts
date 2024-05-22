import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileResponse, ProfileSingleResponse } from '../interfaces/profile.interface';
import { ProfileRepository } from '../repositories/profile.repository';
import {
  ProfileHappen,
  HappenSingleton,
  HappenResponsePageable,
  HttpResponseHappen,
} from '../interfaces/profile.happen.interface';
import { JsonMapProperties } from '../../../../core/decorators/json.decorator';
import { PageableUser } from '../../../../interfaces/pageable.interface';
import { FollowRequest } from '../../../../interfaces/follow.interface';
import { HttpResponseDefault } from '../../../../interfaces/http-response.interface';

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
  public getHappens(): Observable<HappenResponsePageable> {
    return this.profileRespository
      .getHappens()
      .pipe(map((data) => JsonMapProperties.deserialize(HappenResponsePageable, data)));
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
   * updateHappen - update one happen
   * @returns Observable<HttpResponseDefault<updateHappen>>
   */
  public updateHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.profileRespository
      .updateHappen(happen)
      .pipe(map((data) => JsonMapProperties.deserialize(HappenSingleton, data)));
  }

  /**
   * INFO:
   * updateHappen - update one happen
   * @returns Observable<HttpResponseDefault<updateHappen>>
   */
  public postHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.profileRespository
      .postHappen(happen)
      .pipe(map((data) => JsonMapProperties.deserialize(HappenSingleton, data)));
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
