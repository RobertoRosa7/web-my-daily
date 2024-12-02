import { Injectable, inject } from '@angular/core';
import { HomeRepository } from '../../repositories/home/home.repository';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly repository: HomeRepository = inject(HomeRepository);
}
