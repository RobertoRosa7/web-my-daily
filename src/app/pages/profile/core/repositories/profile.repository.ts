import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paths } from '../../../../core/enums/base.enum';
import { Url } from '../../../../core/decorators/url.decorator';
import { Observable } from 'rxjs';
import { HttpResponseHappen, ProfileHappen, HappenResponsePageable } from '../interfaces/profile.happen.interface';
import { ProfileResponse } from '../interfaces/profile.interface';
import { FollowRequest } from '../../../../interfaces/follow.interface';
import { HttpResponseDefault } from '../../../../interfaces/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  @Url(Paths.getProfile)
  private urlProfile!: string;

  @Url(Paths.getHappen)
  private urlProfileHappen!: string;

  @Url(Paths.profilePublic)
  private urlProfilePublic!: string;

  @Url(Paths.userFollow)
  private urlUserFollowing!: string;

  @Url(Paths.deleteHappen)
  private urlDeleteHappen!: string;

  @Url(Paths.updateHappen)
  private urlUpdateHappen!: string;

  @Url(Paths.postHappen)
  private urlPostHappen!: string;

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
   * @returns Observable<ProfileHappenResponseAsList>
   */
  public getHappens(): Observable<HappenResponsePageable> {
    return this.http.get<HappenResponsePageable>(this.urlProfileHappen);
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

  /**
   * INFO:
   * deleteHappen - delete one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public deleteHappen(happen: ProfileHappen): Observable<HttpResponseDefault<void>> {
    return this.http.delete<HttpResponseDefault<void>>(`${this.urlDeleteHappen}/${happen.id}`);
  }

  /**
   * INFO:
   * updateHappen - update one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public updateHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.http.put<HttpResponseHappen>(`${this.urlUpdateHappen}/${happen.id}`, {
      text: happen.whatHappen,
      visibility: happen.visibility,
    });
  }

  /**
   * INFO:
   * postHappen - update one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public postHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.http.post<HttpResponseHappen>(`${this.urlPostHappen}`, {
      text: happen.whatHappen,
      visibility: happen.visibility,
    });
  }
}
