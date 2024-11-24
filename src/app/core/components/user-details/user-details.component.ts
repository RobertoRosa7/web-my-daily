import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { UserProfile } from '../../interfaces/profile/profile.interface';

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
  @Input({ required: true })
  public profile!: UserProfile | null;

  constructor() {}
}
