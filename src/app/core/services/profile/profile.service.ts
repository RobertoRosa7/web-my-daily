import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpUserResponse, ProfileResponse, ProfileSingleResponse } from '../../interfaces/profile/profile.interface';
import { ProfileRepository } from '../../repositories/profile/profile.repository';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import { PageableUser } from '../../interfaces/pageables/pageable.interface';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';

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
   * getProfilePublic - Public any can access information from users
   *
   * @param string | null
   * @returns Observable<ProfileHappenResponse>
   */
  public getProfilePublic(name: string | null): Observable<ProfileResponse> {
    return this.profileRespository.getProfilePublic(name).pipe(map((data) => this.singleTonOrPageable(name, data)));
  }

  /**
   * Following - following user
   *
   * @param follower FollowRequest
   * @returns Observable<HttpResponseDefault<string>>
   */
  public following(follower: FollowRequest): Observable<HttpResponseDefault<string>> {
    return this.profileRespository.following(follower);
  }

  /**
   *
   * @param nickname string
   * @returns Observable<HttpUserResponse>
   */
  public changeNickName(nickname: string): Observable<HttpUserResponse> {
    return this.profileRespository
      .changeNickName(nickname)
      .pipe(map((data) => JsonMapProperties.deserialize(HttpUserResponse, data)));
  }

  /**
   *
   * @param nameId string
   * @returns Observable<HttpUserResponse>
   */
  public changeNameId(nameId: string): Observable<HttpUserResponse> {
    return this.profileRespository
      .changeNameId(nameId)
      .pipe(map((data) => JsonMapProperties.deserialize(HttpUserResponse, data)));
  }

  /**
   * deleteProfle - deleteProfle user
   * @returns Observable<HttpResponseDefault<string>>
   */
  public deleteProfile(id: string): Observable<HttpResponseDefault<string>> {
    return this.profileRespository.deleteProfle(id);
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
