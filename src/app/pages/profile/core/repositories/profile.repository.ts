import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paths } from '../../../../core/enums/bases/base.enum';
import { Url } from '../../../../core/decorators/urls/url.decorator';
import { Observable } from 'rxjs';
import { HttpUserResponse, ProfileResponse } from '../interfaces/profile.interface';
import { FollowRequest } from '../../../../core/interfaces/follows/follow.interface';
import { HttpResponseDefault } from '../../../../core/interfaces/https/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  @Url(Paths.pathGetProfile)
  private readonly urlProfile!: string;

  @Url(Paths.pathGetprofilePublic)
  private readonly urlProfilePublic!: string;

  @Url(Paths.pathPostUserFollow)
  private readonly urlUserFollowing!: string;

  @Url(Paths.pathPutUserChangeNickname)
  private readonly urlPostUserChangeNickname!: string;

  private readonly http: HttpClient = inject(HttpClient);

  /**
   * INFO:
   * getUseProfile - Private - user is need to logged
   * @see: https://cloudmark.github.io/Json-Mapping/
   *
   */
  public getUseProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.urlProfile);
  }

  public changeNickName(nickname: string): Observable<HttpUserResponse> {
    return this.http.put<HttpUserResponse>(this.urlPostUserChangeNickname, { nickname });
  }

  /**
   * INFO:
   * getProfilePublic - Public any can access information from users
   * @returns Observable<ProfileHappenResponseAsList>
   */
  public getProfilePublic(name: string | null): Observable<ProfileResponse> {
    const url = name ? this.urlProfilePublic + '?name=' + name : this.urlProfilePublic;
    return this.http.get<ProfileResponse>(url);
  }

  /**
   * INFO:
   * Following - following user
   * @returns Observable<HttpResponseDefault<string>>
   */
  public following(follower: FollowRequest): Observable<HttpResponseDefault<string>> {
    return this.http.put<HttpResponseDefault<string>>(`${this.urlUserFollowing}`, follower);
  }
}
