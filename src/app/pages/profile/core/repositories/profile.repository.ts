import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paths } from '../../../../core/enums/base.enum';
import { Url } from '../../../../core/decorators/url.decorator';
import { Observable } from 'rxjs';
import { UserProfileResponse } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  @Url(Paths.getProfile)
  private urlProfile!: string;

  constructor(private readonly http: HttpClient) {}

  /**
   * @see: https://cloudmark.github.io/Json-Mapping/
   */
  public getUseProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(this.urlProfile);
  }
}
