import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paths } from '../../../../core/enums/bases/base.enum';
import { Url } from '../../../../core/decorators/urls/url.decorator';
import { HappenResponsePageable } from '../../../../core/interfaces/happens/profile.happen.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeRepository {
  @Url(Paths.getTimeline)
  private urlGetTimeline!: string;

  private readonly http: HttpClient = inject(HttpClient);

  public getTimeline(): Observable<HappenResponsePageable> {
    return this.http.get<HappenResponsePageable>(this.urlGetTimeline);
  }
}
