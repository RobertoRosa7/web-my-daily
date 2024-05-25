import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeRepository {
  private readonly http: HttpClient = inject(HttpClient);
}
