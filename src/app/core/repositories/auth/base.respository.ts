import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable()
export abstract class BaseRepository {
  protected readonly http: HttpClient = inject(HttpClient);
}
