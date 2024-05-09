import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileResponse } from '../interfaces/profile.interface';
import { ProfileRepository } from '../repositories/profile.repository';
import { ProfileHappenResponse } from '../interfaces/profile.happen.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly profileRespository: ProfileRepository) {}

  /**
   * @see: https://cloudmark.github.io/Json-Mapping/
   */
  public getUseProfile(): Observable<UserProfileResponse> {
    return this.profileRespository.getUseProfile();
  }

  /**
   * INFO:
   * getHappens - layer 1
   * @returns Observable<ProfileHappenResponse>
   */
  public getHappens(): Observable<ProfileHappenResponse> {
    return this.profileRespository.getHappens();
  }
}
