import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { profileObservable } from '../../interfaces/profile.interface';
import { selectorProfile } from '../../selectors/profile.selector';
import { Store } from '@ngrx/store';

registerLocaleData(localePt, 'pt');

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
  imports: [CommonModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
})
export class UserDetailsComponent {
  public userProfile$: profileObservable = this.store.select(selectorProfile);

  constructor(private readonly store: Store) {}
}
