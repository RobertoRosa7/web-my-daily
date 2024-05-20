import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { PublicProfileService } from '../services/public-profile.service';

/**
 * @see: https://ngrx.io/guide/effects
 */
@Injectable()
export class PublicProfileHappensEffect {
  private readonly action: Actions = inject(Actions);
  private readonly profileService = inject(PublicProfileService);
}
