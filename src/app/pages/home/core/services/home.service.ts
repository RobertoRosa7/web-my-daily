import { Injectable, inject } from '@angular/core';
import { HomeRepository } from '../repositories/home.repository';
import { HappenResponsePageable } from '../../../../core/interfaces/happens/profile.happen.interface';
import { Observable, map } from 'rxjs';
import { JsonMapProperties } from '../../../../core/decorators/jsons/json.decorator';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly repository: HomeRepository = inject(HomeRepository);

  /**
   * INFO:
   * getTimeline - responsible to get timeline from users
   * @returns Observable<HappenResponsePageable>
   */
  public getTimeline(): Observable<HappenResponsePageable> {
    return this.repository
      .getTimeline()
      .pipe(map((data) => JsonMapProperties.deserialize(HappenResponsePageable, data)));
  }
}
