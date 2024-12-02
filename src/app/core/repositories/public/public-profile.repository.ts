import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathsEnum } from '../../enums/bases/base.enum';
import { Url } from '../../decorators/urls/url.decorator';
import { Observable } from 'rxjs';
import { ProfileHappen, ProfileHappenResponse } from '../../interfaces/public/public-profile.happen.interface';
import { ProfileResponse } from '../../interfaces/public/public-profile.interface';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  @Url(PathsEnum.pathGetProfile)
  private urlProfile!: string;

  @Url(PathsEnum.pathGetHappen)
  private urlProfileHappen!: string;

  @Url(PathsEnum.pathGetprofilePublic)
  private urlProfilePublic!: string;

  @Url(PathsEnum.pathPostUserFollow)
  private urlUserFollowing!: string;

  @Url(PathsEnum.pathDelHappen)
  private urlDeleteHappen!: string;

  constructor(private readonly http: HttpClient) {}

  /**
   * INFO:
   * getUseProfile - Private - user is need to logged
   * @see: https://cloudmark.github.io/Json-Mapping/
   *
   */
  public getUseProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.urlProfile);
  }

  /**
   * INFO:
   * getHappens - layer 0
   * @returns Observable<ProfileHappenResponse>
   */
  public getHappens(): Observable<ProfileHappenResponse> {
    return this.http.get<ProfileHappenResponse>(this.urlProfileHappen);
  }

  /**
   * INFO:
   * getProfilePublic - Public any can access information from users
   * @returns Observable<ProfileHappenResponse>
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

  /**
   * INFO:
   * deleteHappen - delete one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public deleteHappen(happen: ProfileHappen): Observable<HttpResponseDefault<void>> {
    return this.http.delete<HttpResponseDefault<void>>(`${this.urlDeleteHappen}/${happen.id}`);
  }
}
