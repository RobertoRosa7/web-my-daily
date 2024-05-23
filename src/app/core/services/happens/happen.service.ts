import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  HappenResponsePageable,
  HappenSingleton,
  HttpResponseHappen,
  ProfileHappen,
} from '../../interfaces/happens/profile.happen.interface';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';
import { HappenRepository } from '../../repositories/happen.repository';

@Injectable({
  providedIn: 'root',
})
export class HappenService {
  private readonly profileRespository: HappenRepository = inject(HappenRepository);

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
   * postHappen - post one happen
   * @returns Observable<HttpResponseDefault<updateHappen>>
   */
  public postHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.profileRespository
      .postHappen(happen)
      .pipe(map((data) => JsonMapProperties.deserialize(HappenSingleton, data)));
  }
}
