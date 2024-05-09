import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileHappen } from '../../interfaces/profile.happen.interface';
import { FollowerPipe } from '../../../../../core/pipes/follwers.pipe';
import { HappenPublicStatus } from '../../../../../core/enums/base.enum';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorProfileName } from '../../selectors/profile.selector';
import { UserProfile } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-feelings',
  templateUrl: `./feelings.component.html`,
  styleUrl: './feelings.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, FollowerPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeelingsComponent {
  public status = HappenPublicStatus;
  public userName$: Observable<Pick<UserProfile, 'name' | 'id'>> = this.store.select(selectorProfileName);

  @Input({ required: true })
  public happen!: ProfileHappen;

  constructor(private readonly store: Store) {}
}
