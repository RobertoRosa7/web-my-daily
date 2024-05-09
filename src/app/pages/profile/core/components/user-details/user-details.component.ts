import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profileObservable } from '../../interfaces/profile.interface';
import { selectorProfile } from '../../selectors/profile.selector';
import { Store } from '@ngrx/store';
import { SharedModule } from '../../../../../shared/shared.module';

/**
 * @see: https://angular.io/api/common/PercentPipe
 * @see: https://angular.io/guide/i18n-common-locale-id
 * @see: https://angular.io/api/core/LOCALE_ID
 */
@Component({
  selector: 'app-user-details',
  styleUrl: './user-details.component.scss',
  templateUrl: `./user-details.component.html`,
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class UserDetailsComponent {
  public userProfile$: profileObservable = this.store.select(selectorProfile);

  constructor(private readonly store: Store) {}
}
