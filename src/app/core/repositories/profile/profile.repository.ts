import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathsEnum } from '../../enums/bases/base.enum';
import { Url } from '../../decorators/urls/url.decorator';
import { Observable } from 'rxjs';
import { HttpUserResponse, ProfileResponse } from '../../interfaces/profile/profile.interface';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  @Url(PathsEnum.pathGetProfile)
  private readonly urlProfile!: string;

  @Url(PathsEnum.pathGetprofilePublic)
  private readonly urlProfilePublic!: string;

  @Url(PathsEnum.pathPostUserFollow)
  private readonly urlUserFollowing!: string;

  @Url(PathsEnum.pathPutUserChangeNickname)
  private readonly urlPostUserChangeNickname!: string;

  @Url(PathsEnum.pathPutUserChangeNameId)
  private readonly urlPostUserChangeNameId!: string;

  @Url(PathsEnum.pathProfileDel)
  private readonly pathProfileDel!: string;

  private readonly http: HttpClient = inject(HttpClient);

  /**
   * getUseProfile - Private - user is need to logged
   * @see: https://cloudmark.github.io/Json-Mapping/
   *
   */
  public getUseProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.urlProfile);
  }

  /**
   *
   * @param nickname string
   * @returns Observable<HttpUserResponse>
   */
  public changeNickName(nickname: string): Observable<HttpUserResponse> {
    return this.http.put<HttpUserResponse>(this.urlPostUserChangeNickname, { nickname });
  }

  /**
   *
   * @param nameId string
   * @returns Observable<HttpUserResponse>
   */
  public changeNameId(nameId: string): Observable<HttpUserResponse> {
    return this.http.put<HttpUserResponse>(this.urlPostUserChangeNameId, { nameId });
  }

  /**
   * getProfilePublic - Public any can access information from users
   * @returns Observable<ProfileHappenResponseAsList>
   */
  public getProfilePublic(name: string | null): Observable<ProfileResponse> {
    const url = name ? this.urlProfilePublic + '?name=' + name : this.urlProfilePublic;
    return this.http.get<ProfileResponse>(url);
  }

  /**
   * Following - following user
   * @returns Observable<HttpResponseDefault<string>>
   */
  public following(follower: FollowRequest): Observable<HttpResponseDefault<string>> {
    return this.http.put<HttpResponseDefault<string>>(`${this.urlUserFollowing}`, follower);
  }

  /**
   * deleteProfle - deleteProfle user
   * @returns Observable<HttpResponseDefault<string>>
   */
  public deleteProfle(id: string): Observable<HttpResponseDefault<string>> {
    return this.http.delete<HttpResponseDefault<string>>(this.pathProfileDel.replace("{id}", id));
  }
}
