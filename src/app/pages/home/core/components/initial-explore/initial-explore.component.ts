import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { User } from '../../../../profile/core/interfaces/profile.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorId } from '../../../../profile/core/selectors/user.selector';

@Component({
  selector: 'app-initial-explore',
  templateUrl: './initial-explore.component.html',
  styleUrls: ['./initial-explore.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialExploreComponent {
  public userId$: Observable<string | undefined> = this.store.select(selectorId);
  @Input({ required: true }) public profile!: User;

  constructor(private readonly store: Store) {}
}
